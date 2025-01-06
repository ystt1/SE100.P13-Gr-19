package com.example.backend.DTO.Team;

import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.entity.RequestStatus;
import lombok.Data;

@Data
public class JoinRequestDTO {
  private Integer teamId;

  private TeamResponseDTO team;

  private UserResponseDTO user;

  private RequestStatus status;

}
