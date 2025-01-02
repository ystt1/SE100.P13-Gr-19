package com.example.backend.service;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.ListSmallQuizResponseDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.SmallQuizResponseDTO;
import com.example.backend.entity.Quiz;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizRepository;
import com.example.backend.repository.TopicRepository;
import com.example.backend.repository.UserRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

  public ListSmallQuizResponseDTO getAllQuizzes(String email,int page,int limit,String sortElement,String direction,String search) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Quiz> quizzesPage;

    if(search != null && !search.isEmpty()){
      quizzesPage = quizRepository.findByCreatorEmailAndContentContainingIgnoreCase(email, search, pageable);
    } else {
      quizzesPage = quizRepository.findByCreatorEmail(email, pageable);
    }

    List<SmallQuizResponseDTO> quizzes = quizzesPage.stream().map(quiz -> modelMapper.map(quiz,SmallQuizResponseDTO.class)).toList();

    return ListSmallQuizResponseDTO.builder()
        .quizzes(quizzes)
        .totalPages(quizzesPage.getTotalPages())
        .totalElements((int)quizzesPage.getTotalElements())
        .build();
  }

  public ListSmallQuizResponseDTO getAllQuizzes(int page, int limit, String sortElement, String direction, String search, int topicId) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Quiz> quizzesPage;

    if (search != null && !search.isEmpty()) {
      if (topicId != 0) {
        quizzesPage = quizRepository.findByContentContainingIgnoreCaseAndTopicId(search, topicId, pageable);
      } else {
        quizzesPage = quizRepository.findByContentContainingIgnoreCase(search, pageable);
      }
    } else {
      if (topicId != 0) {
        quizzesPage = quizRepository.findByTopicId(topicId, pageable);
      } else {
        quizzesPage = quizRepository.findAll(pageable);
      }
    }

    List<SmallQuizResponseDTO> quizzes = quizzesPage.stream()
        .map(quiz -> modelMapper.map(quiz, SmallQuizResponseDTO.class))
        .toList();

    return ListSmallQuizResponseDTO.builder()
        .quizzes(quizzes)
        .totalPages(quizzesPage.getTotalPages())
        .totalElements((int) quizzesPage.getTotalElements())
        .build();
  }
}
