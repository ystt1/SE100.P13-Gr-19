package com.example.backend.service;

import com.example.backend.DTO.Quiz.ListSmallQuizResponseDTO;
import com.example.backend.DTO.Quiz.SmallQuizResponseDTO;
import com.example.backend.DTO.Topic.ListTopicResponseDTO;
import com.example.backend.DTO.Topic.TopicRequestDTO;
import com.example.backend.DTO.Topic.TopicResponseDTO;
import com.example.backend.entity.Topic;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import com.example.backend.repository.TopicRepository;
import com.example.backend.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TopicService {

  private final TopicRepository topicRepository;

  private final UserRepository userRepository;

  private ModelMapper modelMapper;

  public TopicResponseDTO createTopic(String email, TopicRequestDTO topicRequestDTO) {
      Topic topic = modelMapper.map(topicRequestDTO, Topic.class);
      if(isTopicExistsByNameAndCreatorEmail(topic.getName(), email)){
        throw new ConflictException("Topic name already exists");
      }

      var user = userRepository.findByEmail(email);

      topic.setCreator(user.get());

      var resultTopic = topicRepository.save(topic);
      var responseTopic = modelMapper.map(resultTopic, TopicResponseDTO.class);
      return responseTopic;
  }

  public void deleteTopic(String email, int id) {
      var topic = topicRepository.findById(id);
      if(topic.isEmpty()){
        throw new ResourceNotFoundException("Topic not found");
      }

      //check if request from user is not creator of topic
      if(!topic.get().getCreator().getEmail().equals(email)){
        throw new ForbiddenException("You are not allowed to delete this topic, only creator can delete this topic");
      }

      topicRepository.deleteById(id);
  }

  public TopicResponseDTO updateTopic(String email, int id, TopicRequestDTO topicRequestDTO) {
      var topic = topicRepository.findById(id);
      if(topic.isEmpty()){
        throw new ResourceNotFoundException("Topic not found");
      }

      //check if request from user is not creator of topic
      if(!topic.get().getCreator().getEmail().equals(email)){
        throw new ForbiddenException("You are not allowed to update this topic, only creator can update this topic");
      }

      Topic updatedTopic = modelMapper.map(topicRequestDTO, Topic.class);
      updatedTopic.setId(id);
      updatedTopic.setCreator(topic.get().getCreator());
      var resultTopic = topicRepository.save(updatedTopic);
      var responseTopic = modelMapper.map(resultTopic, TopicResponseDTO.class);
      return responseTopic;
  }

  private boolean isTopicExistsByNameAndCreatorEmail(String name, String email){
    return topicRepository.findByNameAndCreatorEmail(name,email).isPresent();
  }

  public ListTopicResponseDTO getAllTopics(String email, int page, int limit, String sortElement, String direction, String search) {
    if (direction == null) {
      direction = "asc";
    }

    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement != null ? sortElement : "id");
    Pageable pageable = PageRequest.of(page - 1, limit, sort);
    Page<Topic> topicsPage;

    if (search != null && !search.isEmpty()) {
      topicsPage = topicRepository.findByCreatorEmailAndNameContainingIgnoreCase(email, search, pageable);
    } else {
      topicsPage = topicRepository.findByCreatorEmail(email, pageable);
    }

    List<TopicResponseDTO> topicResponseDTOs = topicsPage.stream()
        .map(topic -> modelMapper.map(topic, TopicResponseDTO.class))
        .collect(Collectors.toList());

    ListTopicResponseDTO listTopicResponseDTO = new ListTopicResponseDTO();
    listTopicResponseDTO.setTopics(topicResponseDTOs);
    listTopicResponseDTO.setTotalElements((int) topicsPage.getTotalElements());
    listTopicResponseDTO.setTotalPages(topicsPage.getTotalPages());
    listTopicResponseDTO.setCurrentPage(page);

    return listTopicResponseDTO;
  }

  public ListSmallQuizResponseDTO getQuizzesByTopicId(int id) {
    var topic = topicRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    List<SmallQuizResponseDTO> quizzes = topic.getQuizList().stream()
        .map(quiz -> modelMapper.map(quiz, SmallQuizResponseDTO.class))
        .collect(Collectors.toList());

    return ListSmallQuizResponseDTO.builder()
        .quizzes(quizzes)
        .build();
  }
}
