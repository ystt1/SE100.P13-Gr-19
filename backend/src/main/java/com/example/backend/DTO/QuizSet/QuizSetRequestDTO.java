package com.example.backend.DTO.QuizSet;

import java.time.Duration;
import lombok.Data;

@Data
public class QuizSetRequestDTO {
  private String name;

  private String description;

  private Boolean allowShowAnswer=true;

  private Long timeLimit;
}
