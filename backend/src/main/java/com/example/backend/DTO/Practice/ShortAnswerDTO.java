package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortAnswerDTO extends Answer{
  private ShortDTO shortDTO;
}
