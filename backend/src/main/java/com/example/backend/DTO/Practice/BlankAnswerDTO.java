package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlankAnswerDTO extends Answer{
  private List<BlankDTO> blanks;
}
