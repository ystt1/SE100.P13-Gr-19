package com.example.backend.service;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.entity.Topic;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizRepository;
import com.example.backend.repository.TopicRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class QuizService {

  QuizRepository quizRepository;

  UserRepository userRepository;

  TopicRepository topicRepository;

  private ModelMapper modelMapper;

  public QuizResponseDTO createQuiz(String email, QuizRequestDTO quizRequestDTO) {
    var user = userRepository.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("User not found with email: " + email));
    var topic = topicRepository.findById(quizRequestDTO.getTopicId()).orElseThrow(()-> new ResourceNotFoundException("Topic not found with id: " + quizRequestDTO.getTopicId()));
    Quiz quiz = Quiz.builder()
        .content(quizRequestDTO.getContent())
        .type(quizRequestDTO.getType())
        .topic(topic)
        .creator(user)
        .createdAt(new java.util.Date())
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

  public QuizResponseDTO getQuizById(int id) {
    var quiz = quizRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Quiz not found with id: " + id));
    return modelMapper.map(quiz, QuizResponseDTO.class);
  }

  public void deleteQuizById(String email, int id) {
    var quiz = quizRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Quiz not found with id: " + id));

    if(!quiz.getCreator().getEmail().equals(email)){
      throw new ForbiddenException("You are not allowed to delete this quiz");
    }

    quizRepository.deleteById(id);
  }
}
