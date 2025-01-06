package com.example.backend.DTO.QuizSet;

import com.example.backend.DTO.Auth.UserResponseDTO;
import java.time.Duration;
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

  private Long timeLimit;

  private Integer totalQuestion;

  private Boolean allowShowAnswer=true;

  private Boolean isBookmarked;

  private Boolean isYourOwn;

  private UserResponseDTO creator;
}
