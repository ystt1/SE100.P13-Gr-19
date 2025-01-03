package com.example.backend.DTO.Practice;

import com.example.backend.entity.QuestionType;
import java.util.List;
import lombok.Data;

@Data
public class QuizResultDTO {
  private Integer id;

  private Integer quizId;

  private String content;

  private QuestionType type;

  private Boolean isCorrect;

  private List<OptionResultDTO> options;

  private List<BlankResultDTO> blanks;

  private ShortResultDTO shortAnswer;
}
