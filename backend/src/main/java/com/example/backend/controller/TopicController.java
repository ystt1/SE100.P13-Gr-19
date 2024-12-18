package com.example.backend.controller;

import com.example.backend.DTO.Topic.ListTopicDTO;
import com.example.backend.DTO.Topic.TopicDTO;
import com.example.backend.service.TopicService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:3000/")
public class TopicController {

  private final TopicService topicService;

  @PostMapping("/topic")
  public ResponseEntity<TopicDTO> createTopic(Principal principal,@RequestBody TopicDTO topicDTO) {
    return topicService.createTopic(principal.getName(),topicDTO);
  }

  @DeleteMapping("/topic/{id}")
  public ResponseEntity<String> deleteTopic(Principal principal,@PathVariable int id) {
    return topicService.deleteTopic(principal.getName(),id);
  }

  @PatchMapping("/topic/{id}")
  public ResponseEntity<TopicDTO> updateTopic(Principal principal,@PathVariable int id,@RequestBody TopicDTO topicDTO) {
    return topicService.updateTopic(principal.getName(),id,topicDTO);
  }

  @GetMapping("/topics")
  public ResponseEntity<ListTopicDTO> getAllTopics(Principal principal,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return topicService.getAllTopics(principal.getName(), page, limit);
  }

  @GetMapping("/topic/{id}")
  public ResponseEntity<TopicDTO> getTopicById(Principal principal,@PathVariable int id) {
    return topicService.getTopicById(principal.getName(),id);
  }
}
