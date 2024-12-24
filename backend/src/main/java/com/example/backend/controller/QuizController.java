package com.example.backend.controller;

import com.example.backend.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {

  private final QuizService quizService;

}
