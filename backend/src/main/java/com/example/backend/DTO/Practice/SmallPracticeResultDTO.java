package com.example.backend.DTO.Practice;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SmallPracticeResultDTO {
  private int id;
  private int quizSetId;
  private String quizSetName;
  private int userId;
  private int attemptTime;
  private Integer completeTime;
  private LocalDateTime createdAt;
  private Integer numberCorrect;
  private Integer totalQuiz;
}
