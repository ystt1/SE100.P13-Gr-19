package com.example.backend.controller;

import com.example.backend.DTO.Quiz.Quiz.ListSmallQuizResponseDTO;
import com.example.backend.DTO.Topic.ListTopicResponseDTO;
import com.example.backend.DTO.Topic.TopicRequestDTO;
import com.example.backend.DTO.Topic.TopicResponseDTO;
import com.example.backend.service.QuizService;
import com.example.backend.service.TopicService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class TopicController {

  private final TopicService topicService;

  private final QuizService quizService;

  @PostMapping("/topic")
  public ResponseEntity<TopicResponseDTO> createTopic(Principal principal,@RequestBody TopicRequestDTO topicRequestDTO) {
    return ResponseEntity.status(200).body(topicService.createTopic(principal.getName(), topicRequestDTO));
  }

  @DeleteMapping("/topic/{id}")
  public ResponseEntity<TopicResponseDTO> deleteTopic(Principal principal,@PathVariable int id) {
    topicService.deleteTopic(principal.getName(),id);
    return ResponseEntity.status(204).build();
  }

  @PatchMapping("/topic/{id}")
  public ResponseEntity<TopicResponseDTO> updateTopic(Principal principal,@PathVariable int id,@RequestBody TopicRequestDTO topicRequestDTO) {
    return ResponseEntity.status(200).body(topicService.updateTopic(principal.getName(),id, topicRequestDTO));
  }

  @GetMapping("/topics")
  public ResponseEntity<ListTopicResponseDTO> getAllTopics(Principal principal,
      @RequestParam(required = false) String sortElement,
      @RequestParam(required = false) String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(topicService.getAllTopics(principal.getName(), page, limit, sortElement, direction, search));
  }

  @GetMapping("/topic/{id}/quizzes")
  public ResponseEntity<ListSmallQuizResponseDTO> getAllQuizzes(
      @PathVariable int id,
      @RequestParam(defaultValue = "id") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(quizService.getAllQuizzes(page, limit, sortElement, direction, search, id));
  }


}
