package com.example.backend.DTO.Quiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizHistoryDetailDTO {
    private int quizId;
    private String questionContent;
    private String userAnswer;
    private String correctAnswer;
    private boolean isCorrect;
}
