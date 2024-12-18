package com.example.backend.DTO.QuizSet;

import lombok.Data;

@Data
public class QuizSetRequestDTO {
  private int id;

  private String name;

  private String description;

  private Boolean allowShowAnswer=true;

  private int topicId;
}
