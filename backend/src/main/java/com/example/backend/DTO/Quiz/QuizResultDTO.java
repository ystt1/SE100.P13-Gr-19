package com.example.backend.DTO.Quiz;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizResultDTO {
    private double score;
    private int correctAnswers;
    private int totalQuestions;
    private double completionTime;
}

