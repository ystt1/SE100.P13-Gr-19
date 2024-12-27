package com.example.backend.DTO.Quiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionAnswerDTO {
    private int quizId;
    private List<Integer> selectedOptionIds;
    private String shortAnswer;
    private List<String> blankAnswers;
}
