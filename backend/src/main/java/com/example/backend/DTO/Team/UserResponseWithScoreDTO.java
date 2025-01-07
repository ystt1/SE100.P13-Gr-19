package com.example.backend.DTO.Team;


import com.example.backend.DTO.User.UserResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseWithScoreDTO extends UserResponseDTO {
  private Integer score;

}
