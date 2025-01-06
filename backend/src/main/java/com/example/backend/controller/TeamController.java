package com.example.backend.controller;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.service.TeamService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team")
@AllArgsConstructor
public class TeamController {

  private final TeamService teamService;

  @PostMapping
  public ResponseEntity<TeamResponseDTO> createTeam(Principal principal, @RequestBody CreateTeamRequestDTO createTeamRequestDTO) {
    return ResponseEntity.status(200).body(teamService.createTeam(principal.getName(), createTeamRequestDTO));
  }
}
