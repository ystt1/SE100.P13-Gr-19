package com.example.backend.DTO.QuizSet;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListQuizSetDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;
  private List<QuizSetResponseDTO> quizSets;
}
