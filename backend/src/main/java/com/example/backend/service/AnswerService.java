package com.example.backend.service;

import com.example.backend.DTO.Quiz.QuizHistoryDetailDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.DTO.Quiz.QuestionAnswerDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AnswerService {

    private final QuizRepository quizRepository;
    private final QuizSetRepository quizSetRepository;
    private final UserRepository userRepository;
    private final ResultRepository resultRepository;
    private final UserAnswerRepository userAnswerRepository;
    private final ShortAnswerRepository shortAnswerRepository;
    private final BlankAnswerRepository blankAnswerRepository;
    private final QuizOptionAnswerRepository quizOptionAnswerRepository;

    public QuizResultDTO submitQuiz(String userEmail, QuizSubmissionDTO submission) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        QuizSet quizSet = quizSetRepository.findById(submission.getQuizSetId()).orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

        int correctAnswers = 0;
        int totalQuestions = submission.getAnswers().size();

        for (var answer : submission.getAnswers()) {
            Quiz quiz = quizRepository.findById(answer.getQuizId()).orElseThrow(() -> new ResourceNotFoundException("Quiz not found"));
            if (isCorrectAnswer(quiz, answer)) {
                correctAnswers++;
            }
            saveUserAnswer(user, quiz, answer);
        }
        double score = (double) correctAnswers / totalQuestions;

        Result result = Result.builder()
                .user(user)
                .quizSet(quizSet)
                .score(score)
                .dateCreated(LocalDateTime.now())
                .completeTime(submission.getCompletionTime())
                .numberAnswerTime(totalQuestions)
                .build();

        resultRepository.save(result);

        return QuizResultDTO.builder()
                .score(score)
                .correctAnswers(correctAnswers)
                .totalQuestions(totalQuestions)
                .completionTime(submission.getCompletionTime())
                .build();
    }

    private boolean isCorrectAnswer(Quiz quiz, QuestionAnswerDTO answer) {
        switch (quiz.getType()) {
            case SINGLE_CHOICE:
            case MULTIPLE_CHOICE:
                return validateOptions(quiz, answer.getSelectedOptionIds());
            case SHORT_ANSWER:
                return validateShortAnswer(quiz, answer.getShortAnswer());
            case FILL_IN_THE_BLANK:
                return validateBlankAnswers(quiz, answer.getBlankAnswers());
            default:
                throw new UnsupportedOperationException("Unsupported question type");
        }
    }

    private boolean validateOptions(Quiz quiz, List<Integer> selectedOptionIds) {
        List<QuizOption> correctOptions = quiz.getOptions().stream().filter(QuizOption::getIsCorrect).toList();
        return correctOptions.size() == selectedOptionIds.size() &&
                correctOptions.stream().allMatch(opt -> selectedOptionIds.contains(opt.getId()));
    }

    private boolean validateShortAnswer(Quiz quiz, String userAnswer) {
        return quiz.getShortAnswer().getContent().equalsIgnoreCase(userAnswer.trim());
    }

    private boolean validateBlankAnswers(Quiz quiz, List<QuestionAnswerDTO.BlankAnswerDTO> blankAnswers) {
        List<Blank> blanks = quiz.getBlanks().stream()
                .sorted((b1, b2) -> Integer.compare(b1.getBlankOrder(), b2.getBlankOrder()))
                .toList();

        if (blanks.size() != blankAnswers.size()) return false;
        for (int i = 0; i < blanks.size(); i++) {
            if (!blanks.get(i).getContent().equalsIgnoreCase(blankAnswers.get(i).getContent().trim())) {
                return false;
            }
        }
        return true;
    }

    private void saveUserAnswer(User user, Quiz quiz, QuestionAnswerDTO answer) {
        UserAnswer userAnswer = UserAnswer.builder()
                .quiz(quiz)
                .score(isCorrectAnswer(quiz, answer) ? 1.0 : 0.0)
                .dateCreated(LocalDateTime.now())
                .type(quiz.getType())
                .isCorrect(isCorrectAnswer(quiz, answer)) // Trạng thái đúng/sai
                .build();

        userAnswerRepository.save(userAnswer);

        if (quiz.getType() == QuestionType.SHORT_ANSWER) {
            ShortAnswer shortAnswer = ShortAnswer.builder()
                    .content(answer.getShortAnswer())
                    .userAnswer(userAnswer)
                    .build();
            shortAnswerRepository.save(shortAnswer);
        } else if (quiz.getType() == QuestionType.FILL_IN_THE_BLANK) {
            for (QuestionAnswerDTO.BlankAnswerDTO blankAnswerDTO : answer.getBlankAnswers()) {
                BlankAnswer blankAnswer = BlankAnswer.builder()
                        .content(blankAnswerDTO.getContent())
                        .blankOrder(blankAnswerDTO.getBlankOrder())
                        .userAnswer(userAnswer)
                        .build();
                blankAnswerRepository.save(blankAnswer);
            }
        } else if (quiz.getType() == QuestionType.SINGLE_CHOICE || quiz.getType() == QuestionType.MULTIPLE_CHOICE) {
            for (Integer optionId : answer.getSelectedOptionIds()) {
                QuizOptionAnswer optionAnswer = QuizOptionAnswer.builder()
                        .content(optionId.toString()) // Hoặc nội dung thực của option
                        .userAnswer(userAnswer)
                        .build();
                quizOptionAnswerRepository.save(optionAnswer);
            }
        }
    }


    public List<Result> getQuizHistory(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        return resultRepository.findByUserId(user.getId());
    }

    public long getQuizAttemptCount(int quizSetId) {
        return resultRepository.countAttemptsByQuizSetId(quizSetId);
    }

    public List<QuizHistoryDetailDTO> getHistoryDetail(int resultId) {
        Result result = resultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Result not found"));

        List<UserAnswer> userAnswers = userAnswerRepository.findByResultId(resultId);
        return userAnswers.stream().map(userAnswer -> {
            Quiz quiz = userAnswer.getQuiz();
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

    private String getUserAnswerContent(UserAnswer userAnswer) {
        switch (userAnswer.getType()) {
            case SINGLE_CHOICE:
            case MULTIPLE_CHOICE:
                return userAnswer.getQuizOptionAnswers().stream()
                        .map(QuizOptionAnswer::getContent)
                        .collect(Collectors.joining(", "));
            case SHORT_ANSWER:
                return userAnswer.getQuizOptionAnswers().stream()
                        .map(QuizOptionAnswer::getContent)
                        .collect(Collectors.joining(", "));
            case FILL_IN_THE_BLANK:
                return userAnswer.getBlankAnswers().stream()
                        .sorted(Comparator.comparingInt(BlankAnswer::getBlankOrder))
                        .map(BlankAnswer::getContent)
                        .collect(Collectors.joining(", "));
            default:
                return "Unsupported question type";
        }
    }
}
