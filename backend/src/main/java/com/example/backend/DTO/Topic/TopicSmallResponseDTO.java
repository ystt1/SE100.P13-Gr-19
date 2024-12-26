package com.example.backend.DTO.Topic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopicSmallResponseDTO {
  private int id;

  private String name;

  private String description;
}
