package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class QuizSetServiceTest {

    @Mock
    private QuizSetRepository quizSetRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private QuizService quizService;

    @InjectMocks
    private QuizSetService quizSetService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateQuizSet_Success() {
        String email = "user@example.com";
        QuizSetRequestDTO requestDTO = new QuizSetRequestDTO();
        requestDTO.setName("New Quiz Set");

        User user = new User();
        user.setEmail(email);

        QuizSet quizSet = new QuizSet();
        quizSet.setName(requestDTO.getName());
        quizSet.setCreator(user);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(quizSetRepository.findAllByNameAndCreatorEmail(requestDTO.getName(), email)).thenReturn(Collections.emptyList());
        when(modelMapper.map(requestDTO, QuizSet.class)).thenReturn(quizSet);
        when(quizSetRepository.save(any(QuizSet.class))).thenReturn(quizSet);
        when(modelMapper.map(quizSet, QuizSetResponseDTO.class)).thenReturn(new QuizSetResponseDTO());

        ResponseEntity<QuizSetResponseDTO> response = quizSetService.createQuizSet(email, requestDTO);

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void testCreateQuizSet_Conflict() {
        String email = "user@example.com";
        QuizSetRequestDTO requestDTO = new QuizSetRequestDTO();
        requestDTO.setName("Existing Quiz Set");

        when(quizSetRepository.findAllByNameAndCreatorEmail(requestDTO.getName(), email)).thenReturn(List.of(new QuizSet()));

        ConflictException exception = assertThrows(ConflictException.class, () -> {
            quizSetService.createQuizSet(email, requestDTO);
        });

        assertEquals("Quiz set with name Existing Quiz Set already exists", exception.getMessage());
    }

    @Test
    public void testDeleteQuizSet_Success() {
        String email = "user@example.com";
        int id = 1;

        User user = new User();
        user.setEmail(email);

        QuizSet quizSet = new QuizSet();
        quizSet.setCreator(user);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));

        ResponseEntity<String> response = quizSetService.deleteQuizSet(email, id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Quiz set deleted successfully", response.getBody());
        verify(quizSetRepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteQuizSet_NotFound() {
        String email = "user@example.com";
        int id = 1;

        when(quizSetRepository.findById(id)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            quizSetService.deleteQuizSet(email, id);
        });

        assertEquals("Quiz set not found", exception.getMessage());
    }

    @Test
    public void testDeleteQuizSet_Forbidden() {
        String email = "user@example.com";
        int id = 1;

        User anotherUser = new User();
        anotherUser.setEmail("other@example.com");

        QuizSet quizSet = new QuizSet();
        quizSet.setCreator(anotherUser);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));

        ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
            quizSetService.deleteQuizSet(email, id);
        });

        assertEquals("You are not authorized to delete this quiz set", exception.getMessage());
    }

    @Test
    public void testGetAllQuizSetsByUserEmail_Success() {
        String email = "user@example.com";
        int page = 0, limit = 10;

        QuizSet quizSet = new QuizSet();
        quizSet.setName("Quiz Set 1");

        List<QuizSet> quizSets = List.of(quizSet);
        Page<QuizSet> quizSetPage = new PageImpl<>(quizSets);

        QuizSetResponseDTO quizSetDTO = new QuizSetResponseDTO();
        quizSetDTO.setName("Quiz Set 1");

        when(quizSetRepository.findAll((Specification<QuizSet>) any(), any(PageRequest.class)))
                .thenReturn(quizSetPage);
        when(modelMapper.map(any(QuizSet.class), eq(QuizSetResponseDTO.class))).thenReturn(quizSetDTO);

        ListQuizSetDTO result = quizSetService.getAllQuizSetsByUserEmail(email, null, "asc", null, page, limit, 0);

        assertNotNull(result);
        assertEquals(1, result.getQuizSets().size());
        assertEquals("Quiz Set 1", result.getQuizSets().get(0).getName());
    }

    @Test
    public void testAddQuizToQuizSet_Success() {
        String email = "user@example.com";
        int id = 1;
        QuizDTO quizDTO = new QuizDTO();

        QuizSet quizSet = new QuizSet();
        User creator = new User();
        creator.setEmail(email);
        quizSet.setCreator(creator);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));
        when(quizService.saveQuiz(any(Quiz.class))).thenReturn(new Quiz());
        when(modelMapper.map(any(QuizDTO.class), eq(Quiz.class))).thenReturn(new Quiz());
        when(modelMapper.map(any(Quiz.class), eq(QuizDTO.class))).thenReturn(quizDTO);

        ResponseEntity<QuizDTO> response = quizSetService.addQuizToQuizSet(email, id, quizDTO);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        verify(quizService, times(1)).saveQuiz(any(Quiz.class));
    }

    @Test
    public void testAddMultipleQuizToQuizSet_Success() {
        String email = "user@example.com";
        int id = 1;
        List<QuizDTO> quizDTOs = List.of(new QuizDTO(), new QuizDTO());

        QuizSet quizSet = new QuizSet();
        User creator = new User();
        creator.setEmail(email);
        quizSet.setCreator(creator);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));
        when(modelMapper.map(any(QuizDTO.class), eq(Quiz.class))).thenReturn(new Quiz());
        when(quizService.saveQuiz(any(Quiz.class))).thenReturn(new Quiz());
        when(modelMapper.map(any(QuizSet.class), eq(QuizSetResponseDTO.class))).thenReturn(new QuizSetResponseDTO());

        ResponseEntity<QuizSetResponseDTO> response = quizSetService.addMultipleQuizToQuizSet(email, id, quizDTOs);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        verify(quizService, times(2)).saveQuiz(any(Quiz.class));
    }

    @Test
    public void testAllowShowAnswer_Success() {
        String email = "user@example.com";
        int id = 1;
        QuizSet quizSet = new QuizSet();
        User creator = new User();
        creator.setEmail(email);
        quizSet.setCreator(creator);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));
        when(quizSetRepository.save(any(QuizSet.class))).thenReturn(quizSet);
        when(modelMapper.map(any(QuizSet.class), eq(QuizSetResponseDTO.class))).thenReturn(new QuizSetResponseDTO());

        ResponseEntity<QuizSetResponseDTO> response = quizSetService.allowShowAnswer(email, id);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(quizSet.getAllowShowAnswer());
        verify(quizSetRepository, times(1)).save(quizSet);
    }

    @Test
    public void testDisableShowAnswer_Success() {
        String email = "user@example.com";
        int id = 1;
        QuizSet quizSet = new QuizSet();
        User creator = new User();
        creator.setEmail(email);
        quizSet.setCreator(creator);

        when(quizSetRepository.findById(id)).thenReturn(Optional.of(quizSet));
        when(quizSetRepository.save(any(QuizSet.class))).thenReturn(quizSet);
        when(modelMapper.map(any(QuizSet.class), eq(QuizSetResponseDTO.class))).thenReturn(new QuizSetResponseDTO());

        ResponseEntity<QuizSetResponseDTO> response = quizSetService.disableShowAnswer(email, id);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertFalse(quizSet.getAllowShowAnswer());
        verify(quizSetRepository, times(1)).save(quizSet);
    }

    @Test
    public void testGetRandomQuizSet_Success() {
        int limit = 2;
        QuizSet quizSet1 = new QuizSet();
        quizSet1.setName("Quiz Set 1");

        QuizSet quizSet2 = new QuizSet();
        quizSet2.setName("Quiz Set 2");

        List<QuizSet> quizSets = List.of(quizSet1, quizSet2);
        Page<QuizSet> quizSetPage = new PageImpl<>(quizSets);

        when(quizSetRepository.count()).thenReturn(10L);
        when(quizSetRepository.findAll(any(PageRequest.class))).thenReturn(quizSetPage);
        when(modelMapper.map(any(QuizSet.class), eq(QuizSetResponseDTO.class)))
                .thenReturn(new QuizSetResponseDTO());

        ListQuizSetDTO result = quizSetService.getRandomQuizSet(limit);

        assertNotNull(result);
        assertEquals(2, result.getQuizSets().size());
        verify(quizSetRepository, times(1)).findAll(any(PageRequest.class));
    }
}
