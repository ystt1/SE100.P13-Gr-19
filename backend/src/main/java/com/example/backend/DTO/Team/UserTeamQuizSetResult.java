package com.example.backend.DTO.Team;

import com.example.backend.DTO.User.UserResponseDTO;
import lombok.Data;

@Data
public class UserTeamQuizSetResult {
  UserResponseDTO user;
  int numberOfCorrectAnswers;
  int numberOfWrongAnswers;
}
