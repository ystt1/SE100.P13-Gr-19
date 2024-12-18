package com.example.backend.DTO.QuizSet;

import com.example.backend.DTO.Quiz.QuizDTO;
import java.util.Date;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class QuizSetResponseDTO {
  private int id;

  private String name;

  private String description;

  private Boolean allowShowAnswer;

  private Date createdTime;

  private Boolean isYourQuizSet;

  private List<QuizDTO> quizzes;

  private int topicId;

  public QuizSetResponseDTO(int id, String name) {
    this.id = id;
    this.name = name;
  }
}
