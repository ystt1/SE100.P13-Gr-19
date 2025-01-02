package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.OptionDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultipleChoiceAnswerDTO extends Answer{
  List<String> options;

  public String toString() {
    return "MultipleChoiceAnswerDTO(" +
        "id=" + id +
        ", type=" + type +
      ", options=" + options +
      ')';
  }
}
