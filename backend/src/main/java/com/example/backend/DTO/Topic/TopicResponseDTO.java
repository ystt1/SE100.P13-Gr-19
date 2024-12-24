package com.example.backend.DTO.Topic;

import com.example.backend.DTO.Auth.UserResponseDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.Quiz;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicResponseDTO {
  private int id;

  private String name;

  private String description;

  private UserResponseDTO creator;

  private List<QuizSetResponseDTO> quizSets;
}
