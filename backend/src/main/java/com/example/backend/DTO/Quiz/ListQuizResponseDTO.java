package com.example.backend.DTO.Quiz;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListQuizResponseDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;
  List<QuizResponseDTO> quizzes;
}
