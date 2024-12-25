package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizResponseDTO;
import com.example.backend.service.QuizService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {

  private final QuizService quizService;

  @PostMapping
  public ResponseEntity<QuizResponseDTO> createQuiz(@RequestBody QuizRequestDTO quizRequestDTO) {
    return ResponseEntity.status(200).body(quizService.createQuiz(quizRequestDTO));
  }

  @GetMapping("/{id}")
  public ResponseEntity<QuizResponseDTO> getQuizById(@PathVariable int id) {
    return ResponseEntity.status(200).body(quizService.getQuizById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizById(Principal principal,@PathVariable int id) {
    quizService.deleteQuizById(principal.getName(),id);
    return ResponseEntity.status(204).build();
  }
}
