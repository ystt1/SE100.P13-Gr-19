package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.service.QuizService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {

  private final QuizService quizService;

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuiz(@PathVariable int id) {
    return quizService.deleteQuiz(id);
  }
}
