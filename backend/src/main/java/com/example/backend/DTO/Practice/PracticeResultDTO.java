package com.example.backend.DTO.Practice;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class PracticeResultDTO {
  private int id;
  private int quizSetId;
  private int userId;
  private int attemptTime;
  private Integer completeTime;
  private LocalDateTime createdAt;
  private Integer numberCorrect;

  private List<QuizResultDTO> quizAnswers;
}
