package com.example.backend.DTO.QuizSet;

import com.example.backend.DTO.Auth.UserResponseDTO;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSetResponseDTO {
  private int id;

  private String name;

  private String description;

  private Date createdTime;

  private Date updatedTime;

  private Boolean allowShowAnswer=true;

  private UserResponseDTO creator;
}
