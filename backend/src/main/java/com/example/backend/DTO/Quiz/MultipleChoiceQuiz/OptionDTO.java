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
  private Integer id;
  private String content;
  private Boolean isCorrect;

  public OptionDTO( String content, Boolean isCorrect) {
    this.content = content;
    this.isCorrect = isCorrect;
  }
}
