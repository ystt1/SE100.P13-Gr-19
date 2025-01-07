package com.example.backend.DTO.Team;

import com.example.backend.DTO.User.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDetail {
  private Integer id;
  private String name;
  private Integer maxParticipant;
  private Integer currentParticipant;
  private UserResponseDTO creatorUser;
  private String status;
}
