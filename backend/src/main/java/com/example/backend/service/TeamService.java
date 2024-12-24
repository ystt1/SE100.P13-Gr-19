package com.example.backend.service;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.entity.Team;
import com.example.backend.entity.User;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public TeamResponseDTO createTeam(CreateTeamRequestDTO request, int creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Creator not found"));

        Team team = Team.builder()
                .name(request.getName())
                .description(request.getDescription())
                .creator(creator)
                .build();

        teamRepository.save(team);

        return TeamResponseDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .description(team.getDescription())
                .creatorId(creator.getId())
                .build();
    }

    public TeamResponseDTO joinTeam(int teamId, int userId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        team.getMembers().add(user);
        teamRepository.save(team);

        return TeamResponseDTO.builder()
                .id(team.getId())
                .name(team.getName())
                .description(team.getDescription())
                .creatorId(team.getCreator().getId())
                .memberIds(team.getMembers().stream().map(User::getId).collect(Collectors.toList()))
                .build();
    }
}
