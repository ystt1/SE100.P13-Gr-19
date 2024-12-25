package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuizRequestDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizService {

  QuizRepository quizRepository;

  private ModelMapper modelMapper;

  public void createQuiz(QuizRequestDTO quizRequestDTO) {
    Quiz quiz = Quiz.builder()
        .content(quizRequestDTO.getContent())
        .type(quizRequestDTO.getType())
        .build();
    System.out.println(quiz);
  }
}
