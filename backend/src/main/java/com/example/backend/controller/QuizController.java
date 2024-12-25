package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizResponseDTO;
import com.example.backend.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
}
