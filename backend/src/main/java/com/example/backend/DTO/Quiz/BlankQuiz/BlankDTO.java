package com.example.backend.DTO.Quiz.BlankQuiz;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlankDTO {
  private String content;
  private Integer order;
}
