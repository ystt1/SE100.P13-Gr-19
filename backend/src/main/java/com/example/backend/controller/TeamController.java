package com.example.backend.controller;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.entity.User;
import com.example.backend.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/create")
    public TeamResponseDTO createTeam(@RequestBody CreateTeamRequestDTO request, @AuthenticationPrincipal User currentUser) {
        return teamService.createTeam(request, currentUser.getId());
    }


    @PostMapping("/join")
    public TeamResponseDTO joinTeam(@RequestParam int teamId, @AuthenticationPrincipal User currentUser) {
        return teamService.joinTeam(teamId, currentUser.getId());
    }
}
