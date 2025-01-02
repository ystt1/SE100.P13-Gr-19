package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizHistoryDetailDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ResultRepository;
import com.example.backend.repository.UserAnswerRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizHistoryService {

    private final ResultRepository resultRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final UserRepository userRepository;

    public List<Result> getQuizHistory(String userEmail) {
        var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return resultRepository.findByUserId(user.getId());
    }

    public List<QuizHistoryDetailDTO> getHistoryDetail(String userEmail, int resultId) {
        var result = resultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found"));

        var userAnswers = userAnswerRepository.findByResultId(resultId);

        return userAnswers.stream().map(userAnswer -> {
            var quiz = userAnswer.getQuiz();
            String correctAnswer = getCorrectAnswer(quiz);
            String userAnswerContent = getUserAnswerContent(userAnswer);

            return QuizHistoryDetailDTO.builder()
                    .quizId(quiz.getId())
                    .questionContent(quiz.getContent())
                    .userAnswer(userAnswerContent)
                    .correctAnswer(correctAnswer)
                    .isCorrect(userAnswer.isCorrect())
                    .build();
        }).collect(Collectors.toList());
    }

    private String getCorrectAnswer(Quiz quiz) {
        switch (quiz.getType()) {
            case SINGLE_CHOICE:
            case MULTIPLE_CHOICE:
                return quiz.getOptions().stream()
                        .filter(QuizOption::getIsCorrect)
                        .map(QuizOption::getContent)
                        .collect(Collectors.joining(", "));
            case SHORT_ANSWER:
                return quiz.getShortAnswer().getContent();
            case FILL_IN_THE_BLANK:
                return quiz.getBlanks().stream()
                        .map(Blank::getContent)
                        .collect(Collectors.joining(", "));
            default:
                throw new UnsupportedOperationException("Unsupported question type");
        }
    }

    private String getUserAnswerContent(QuizAnswer quizAnswer) {
        switch (quizAnswer.getType()) {
            case SINGLE_CHOICE:
            case MULTIPLE_CHOICE:
                return quizAnswer.getQuizOptionAnswers().stream()
                        .map(QuizOptionAnswer::getContent)
                        .collect(Collectors.joining(", "));
            case SHORT_ANSWER:
                return quizAnswer.getQuizOptionAnswers().stream()
                        .map(QuizOptionAnswer::getContent)
                        .collect(Collectors.joining(", "));
            case FILL_IN_THE_BLANK:
                return quizAnswer.getBlankAnswers().stream()
                        .sorted(Comparator.comparingInt(BlankAnswer::getBlankOrder))
                        .map(BlankAnswer::getContent)
                        .collect(Collectors.joining(", "));
            default:
                return "Unsupported question type";
        }
    }
}
