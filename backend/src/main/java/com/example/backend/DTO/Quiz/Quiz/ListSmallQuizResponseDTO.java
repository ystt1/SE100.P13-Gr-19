package com.example.backend.DTO.Quiz.Quiz;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListSmallQuizResponseDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;
  List<SmallQuizResponseDTO> quizzes;
}
