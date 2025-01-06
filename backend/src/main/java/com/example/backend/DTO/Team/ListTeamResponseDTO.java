package com.example.backend.DTO.Team;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListTeamResponseDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;

  private List<TeamResponseDTO> teams;
}
