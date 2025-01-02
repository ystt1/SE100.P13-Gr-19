package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankDTO;
import java.util.List;
import lombok.Data;

@Data
public class BlankAnswerDTO extends Answer{
  private List<BlankDTO> blanks;
}
