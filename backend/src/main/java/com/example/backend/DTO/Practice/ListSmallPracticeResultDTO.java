package com.example.backend.DTO.Practice;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListSmallPracticeResultDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;
  private List<SmallPracticeResultDTO> results;
}
