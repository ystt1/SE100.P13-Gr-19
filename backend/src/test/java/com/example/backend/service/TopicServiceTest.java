package com.example.backend.service;

import com.example.backend.DTO.Topic.ListTopicDTO;
import com.example.backend.DTO.Topic.TopicDTO;
import com.example.backend.entity.Topic;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.repository.TopicRepository;
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
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TopicServiceTest {

    @Mock
    private TopicRepository topicRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TopicService topicService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateTopic_Success() {
        String email = "creator@example.com";
        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setName("New Topic");

        User user = new User();
        user.setEmail(email);

        Topic topic = new Topic();
        topic.setName(topicDTO.getName());
        topic.setCreator(user);

        when(topicRepository.findByNameAndCreatorEmail(topicDTO.getName(), email)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(modelMapper.map(topicDTO, Topic.class)).thenReturn(topic);
        when(topicRepository.save(any(Topic.class))).thenReturn(topic);
        when(modelMapper.map(topic, TopicDTO.class)).thenReturn(topicDTO);

        ResponseEntity<TopicDTO> response = topicService.createTopic(email, topicDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(topicDTO, response.getBody());
    }

    @Test
    public void testCreateTopic_Conflict() {
        String email = "creator@example.com";
        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setName("Existing Topic");

        when(topicRepository.findByNameAndCreatorEmail(topicDTO.getName(), email)).thenReturn(Optional.of(new Topic()));

        ConflictException exception = assertThrows(ConflictException.class, () -> {
            topicService.createTopic(email, topicDTO);
        });

        assertEquals("Topic name already exists", exception.getMessage());
    }

    @Test
    public void testDeleteTopic_Success() {
        String email = "creator@example.com";
        int id = 1;

        User user = new User();
        user.setEmail(email);

        Topic topic = new Topic();
        topic.setCreator(user);

        when(topicRepository.findById(id)).thenReturn(Optional.of(topic));

        ResponseEntity<String> response = topicService.deleteTopic(email, id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Topic deleted successfully", response.getBody());
        verify(topicRepository, times(1)).deleteById(id);
    }

    @Test
    public void testDeleteTopic_NotFound() {
        String email = "creator@example.com";
        int id = 1;

        when(topicRepository.findById(id)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            topicService.deleteTopic(email, id);
        });

        assertEquals("Topic not found", exception.getMessage());
    }

    @Test
    public void testDeleteTopic_Forbidden() {
        String email = "creator@example.com";
        int id = 1;

        User anotherUser = new User();
        anotherUser.setEmail("another@example.com");

        Topic topic = new Topic();
        topic.setCreator(anotherUser);

        when(topicRepository.findById(id)).thenReturn(Optional.of(topic));

        ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
            topicService.deleteTopic(email, id);
        });

        assertEquals("You are not allowed to delete this topic, only creator can delete this topic", exception.getMessage());
    }

    @Test
    public void testUpdateTopic_Success() {
        String email = "creator@example.com";
        int id = 1;

        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setName("Updated Topic");

        User user = new User();
        user.setEmail(email);

        Topic topic = new Topic();
        topic.setId(id);
        topic.setCreator(user);

        Topic updatedTopic = new Topic();
        updatedTopic.setId(id);
        updatedTopic.setCreator(user);
        updatedTopic.setName(topicDTO.getName());

        when(topicRepository.findById(id)).thenReturn(Optional.of(topic));
        when(modelMapper.map(topicDTO, Topic.class)).thenReturn(updatedTopic);
        when(topicRepository.save(any(Topic.class))).thenReturn(updatedTopic);
        when(modelMapper.map(updatedTopic, TopicDTO.class)).thenReturn(topicDTO);

        ResponseEntity<TopicDTO> response = topicService.updateTopic(email, id, topicDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(topicDTO, response.getBody());
    }

    @Test
    public void testGetAllTopics_Success() {
        String email = "creator@example.com";
        int page = 1, limit = 10;

        User user = new User();
        user.setEmail(email);

        Topic topic = new Topic();
        topic.setName("Topic 1");

        List<Topic> topicList = List.of(topic);
        Page<Topic> topicPage = new PageImpl<>(topicList);

        TopicDTO topicDTO = new TopicDTO();
        topicDTO.setName("Topic 1");

        when(topicRepository.findAllByCreatorEmail(email, PageRequest.of(page - 1, limit))).thenReturn(topicPage);
        when(modelMapper.map(topic, TopicDTO.class)).thenReturn(topicDTO);

        ResponseEntity<ListTopicDTO> response = topicService.getAllTopics(email, page, limit);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getTopics().size());
        assertEquals("Topic 1", response.getBody().getTopics().get(0).getName());
    }
}
