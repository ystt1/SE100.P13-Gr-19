package com.example.backend.DTO.Quiz.MultipleChoiceQuiz;

import com.example.backend.DTO.Quiz.QuizRequestDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MultipleChoiceQuizRequestDTO extends QuizRequestDTO {
  List<OptionDTO> options;
}