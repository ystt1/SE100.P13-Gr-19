package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class QuizServiceTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private QuizService quizService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveQuiz_Success() {
        Quiz quiz = new Quiz();
        quiz.setId(1);
        quiz.setContent("Sample Content");

        when(quizRepository.save(any(Quiz.class))).thenReturn(quiz);

        Quiz result = quizService.saveQuiz(quiz);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Sample Content", result.getContent());
        verify(quizRepository, times(1)).save(quiz);
    }

    @Test
    void testGetQuizzesByQuizSetId_Success() {
        int quizSetId = 1;
        Quiz quiz1 = new Quiz();
        quiz1.setId(1);
        quiz1.setContent("Content 1");

        Quiz quiz2 = new Quiz();
        quiz2.setId(2);
        quiz2.setContent("Content 2");

        List<Quiz> quizzes = List.of(quiz1, quiz2);
        QuizDTO quizDTO1 = new QuizDTO();
        quizDTO1.setId(1);
        quizDTO1.setContent("Content 1");

        QuizDTO quizDTO2 = new QuizDTO();
        quizDTO2.setId(2);
        quizDTO2.setContent("Content 2");

        when(quizRepository.findAllByQuizSetId(quizSetId)).thenReturn(quizzes);
        when(modelMapper.map(quiz1, QuizDTO.class)).thenReturn(quizDTO1);
        when(modelMapper.map(quiz2, QuizDTO.class)).thenReturn(quizDTO2);

        ResponseEntity<List<QuizDTO>> response = quizService.getQuizzesByQuizSetId(quizSetId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("Content 1", response.getBody().get(0).getContent());
        verify(quizRepository, times(1)).findAllByQuizSetId(quizSetId);
    }

    @Test
    void testDeleteQuiz_Success() {
        int quizId = 1;

        doNothing().when(quizRepository).deleteById(quizId);

        ResponseEntity<String> response = quizService.deleteQuiz(quizId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Quiz deleted successfully", response.getBody());
        verify(quizRepository, times(1)).deleteById(quizId);
    }

    @Test
    void testDeleteQuiz_QuizNotFound() {
        int quizId = 1;

        doThrow(new RuntimeException("Quiz not found"))
                .when(quizRepository).deleteById(quizId);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            quizService.deleteQuiz(quizId);
        });

        assertEquals("Quiz not found", exception.getMessage());
        verify(quizRepository, times(1)).deleteById(quizId);
    }

}
