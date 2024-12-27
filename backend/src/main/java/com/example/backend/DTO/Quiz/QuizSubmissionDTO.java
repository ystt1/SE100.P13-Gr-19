package com.example.backend.DTO.Quiz;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSubmissionDTO {
    private int quizSetId;
    private List<QuestionAnswerDTO> answers;
    private double completionTime;
}


