package com.example.backend.DTO.Quiz;

import com.example.backend.entity.QuestionType;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDTO {
  private int id;

  private String content;

  private List<String> answers;

  private QuestionType type;

  private String correctAnswer;

  private int quizSetId;

}
