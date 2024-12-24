package com.example.backend.DTO.Quiz;

import com.example.backend.entity.QuestionType;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizRequestDTO {
  private Integer id;

  private String content;

  private QuestionType type;

  private int quizSetId;

  private int creatorId;



}
