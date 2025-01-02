package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.OptionDTO;
import java.util.List;
import lombok.Data;

@Data
public class MultipleChoiceAnswerDTO extends Answer{
  List<OptionDTO> options;
}
