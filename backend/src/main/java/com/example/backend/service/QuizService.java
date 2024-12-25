package com.example.backend.service;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
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

  public QuizResponseDTO createQuiz(QuizRequestDTO quizRequestDTO) {
    Quiz quiz = Quiz.builder()
        .content(quizRequestDTO.getContent())
        .type(quizRequestDTO.getType())
        .build();

    switch (quizRequestDTO.getType()) {
      case SHORT_ANSWER:
        quiz.setAnswerFromDTO((ShortAnswerQuizRequestDTO) quizRequestDTO);
        break;
      case SINGLE_CHOICE:
      case MULTIPLE_CHOICE:
        quiz.setAnswerFromDTO((MultipleChoiceQuizRequestDTO) quizRequestDTO);
        break;
      case DRAG_AND_DROP:
      case FILL_IN_THE_BLANK:
        quiz.setAnswerFromDTO((BlankQuizRequestDTO) quizRequestDTO);
        break;
      default:
        throw new IllegalArgumentException("Unsupported quiz type: " + quizRequestDTO.getType());
    }

    var quizResult = quizRepository.save(quiz);

    return modelMapper.map(quizResult, QuizResponseDTO.class);
  }
}
