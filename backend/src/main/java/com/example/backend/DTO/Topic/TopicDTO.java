package com.example.backend.DTO.Topic;

import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import lombok.Data;

@Data
public class TopicDTO {
  private int id;

  private String name;

  private String description;
}
