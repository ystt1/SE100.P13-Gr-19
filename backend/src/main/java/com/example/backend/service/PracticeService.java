package com.example.backend.service;

import com.example.backend.DTO.Practice.PracticeQuizDTO;
import com.example.backend.DTO.Practice.PracticeQuizResponseDTO;
import com.example.backend.DTO.Practice.PracticeResponseDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.AttemptDetail;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.QuizSetAttempt;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.AttemptDetailRepository;
import com.example.backend.repository.QuizRepository;
import com.example.backend.repository.QuizSetAttemptRepository;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.UserRepository;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PracticeService {

  private final QuizRepository quizRepository;

  private final QuizSetRepository quizSetRepository;

  private final AttemptDetailRepository attemptDetailRepository;

  private final QuizSetAttemptRepository quizSetAttemptRepository;

  private final UserRepository userRepository;

  public ResponseEntity<String> savePractice(String email, int quizSetId, List<PracticeQuizDTO> listPracticeQuizDTO) {
    User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    QuizSet quizSet = quizSetRepository.findById(quizSetId).orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    QuizSetAttempt quizSetAttempt = new QuizSetAttempt();
    quizSetAttempt.setUser(user);
    quizSetAttempt.setQuizSet(quizSet);
    quizSetAttempt.setAttempt(this.getMaxAttempt(user.getId(), quizSetId) + 1);
    quizSetAttempt.setPracticeTime(new Date());

    List<AttemptDetail> attemptDetails = listPracticeQuizDTO.stream().map(quizDTO -> {
      AttemptDetail attemptDetail = new AttemptDetail();
      attemptDetail.setQuizSetAttempt(quizSetAttempt);

      var quiz = quizRepository.findById(quizDTO.getQuizId());

      if(quiz.isEmpty()) {
        throw new ResourceNotFoundException("Quiz not found");
      }

      attemptDetail.setQuiz(quiz.get());
      attemptDetail.setAnswer(quizDTO.getAnswer());


      if(quiz.get().getCorrectAnswer().equals(quizDTO.getAnswer())) {
        attemptDetail.setIsCorrect(true);
      } else {
        attemptDetail.setIsCorrect(false);
      }

      //attemptDetail.setIsCorrect(quizDTO.getIsCorrect());
      return attemptDetail;
    }).collect(Collectors.toList());

    quizSetAttempt.setAttemptDetails(attemptDetails);
    quizSetAttempt.setNumberOfCorrectAnswers((int) attemptDetails.stream().filter(AttemptDetail::getIsCorrect).count());

    quizSetAttemptRepository.save(quizSetAttempt);

    return ResponseEntity.status(200).body("Practice saved successfully");
  }

  public int getMaxAttempt(int userId, int quizSetId) {
    return quizSetAttemptRepository.findMaxAttemptByUserIdAndQuizSetId(userId, quizSetId);
  }

  public ResponseEntity<List<PracticeResponseDTO>> getPractices(String name) {
    User user = userRepository.findByEmail(name).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    List<QuizSetAttempt> quizSetAttempts = quizSetAttemptRepository.findAllByUserId(user.getId());

    List<PracticeResponseDTO> practiceResponseDTOs = quizSetAttempts.stream().map(quizSetAttempt -> {
      PracticeResponseDTO practiceResponseDTO = new PracticeResponseDTO();
      practiceResponseDTO.setId(quizSetAttempt.getId());
      practiceResponseDTO.setQuizSet(new QuizSetResponseDTO(quizSetAttempt.getQuizSet().getId(), quizSetAttempt.getQuizSet().getName()));
      practiceResponseDTO.setUserId(quizSetAttempt.getUser().getId());
      practiceResponseDTO.setNumberOfCorrectAnswers(quizSetAttempt.getNumberOfCorrectAnswers());
      practiceResponseDTO.setAttempt(quizSetAttempt.getAttempt());
      practiceResponseDTO.setPracticeTime(quizSetAttempt.getPracticeTime());
      return practiceResponseDTO;
    }).collect(Collectors.toList());

    return ResponseEntity.ok(practiceResponseDTOs);
  }

    public ResponseEntity<List<PracticeQuizResponseDTO>> getPracticeDetail(String name, int id) {
    User user = userRepository.findByEmail(name).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    QuizSetAttempt quizSetAttempt = quizSetAttemptRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Quiz set attempt not found"));

    List<PracticeQuizResponseDTO> practiceQuizResponseDTOs = quizSetAttempt.getAttemptDetails().stream().map(attemptDetail -> {
      PracticeQuizResponseDTO practiceQuizResponseDTO = new PracticeQuizResponseDTO();
      practiceQuizResponseDTO.setCorrectAnswer(attemptDetail.getQuiz().getCorrectAnswer());
      practiceQuizResponseDTO.setQuizId(attemptDetail.getQuiz().getId());
      practiceQuizResponseDTO.setContent(attemptDetail.getQuiz().getContent());
      practiceQuizResponseDTO.setAnswers(attemptDetail.getQuiz().getAnswers());
      practiceQuizResponseDTO.setChooseAnswer(attemptDetail.getAnswer());
      return practiceQuizResponseDTO;
    }).collect(Collectors.toList());

    return ResponseEntity.ok(practiceQuizResponseDTOs);
  }
}
