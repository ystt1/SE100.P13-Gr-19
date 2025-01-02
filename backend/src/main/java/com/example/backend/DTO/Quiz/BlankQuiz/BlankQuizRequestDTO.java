package com.example.backend.DTO.Quiz.BlankQuiz;

import com.example.backend.DTO.Quiz.Quiz.QuizRequestDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BlankQuizRequestDTO extends QuizRequestDTO {
  private List<BlankDTO> blanks;
}
