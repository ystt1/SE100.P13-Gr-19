package com.example.backend.DTO.Quiz.MultipleChoiceQuiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OptionDTO {
  private String content;
  private Boolean isCorrect;
}
