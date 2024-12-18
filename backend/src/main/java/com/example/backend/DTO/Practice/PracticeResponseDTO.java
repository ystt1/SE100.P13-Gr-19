package com.example.backend.DTO.Practice;

import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PracticeResponseDTO {

  private int id;

  private QuizSetResponseDTO quizSet;

  private Integer userId;

  private Integer numberOfCorrectAnswers;

  private Integer attempt;

  private Date practiceTime;

}
