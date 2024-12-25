package com.example.backend.controller;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/create")
    public TeamResponseDTO createTeam(@RequestBody CreateTeamRequestDTO request, @RequestParam int creatorId) {
        return teamService.createTeam(request, creatorId);
    }

    @PostMapping("/join")
    public TeamResponseDTO joinTeam(@RequestParam int teamId, @RequestParam int userId) {
        return teamService.joinTeam(teamId, userId);
    }
}
