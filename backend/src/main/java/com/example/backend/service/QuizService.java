package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.repository.QuizRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizService {

  QuizRepository quizRepository;

  private ModelMapper modelMapper;

  public Quiz saveQuiz(Quiz quiz) {
    return quizRepository.save(quiz);
  }

  public ResponseEntity<String> deleteQuiz(int id) {
    quizRepository.deleteById(id);
    return ResponseEntity.ok("Quiz deleted successfully");
  }
}
