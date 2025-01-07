package com.example.backend.DTO.Team;

import com.example.backend.DTO.User.UserResponseDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ListMemberDTO {
  private int totalElements;
  private int totalPages;
  private int currentPage;

  private List<UserResponseDTO> members;
}
