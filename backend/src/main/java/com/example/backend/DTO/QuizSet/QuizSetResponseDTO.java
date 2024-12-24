package com.example.backend.DTO.QuizSet;

import com.example.backend.DTO.Quiz.QuizDTO;
import java.util.Date;
import java.util.List;
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

  private int creatorId;
}
