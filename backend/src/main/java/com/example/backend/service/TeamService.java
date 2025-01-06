package com.example.backend.service;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.entity.Team;
import com.example.backend.entity.TeamMemberDetail;
import com.example.backend.entity.TeamRole;
import com.example.backend.exception.ConflictException;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

  private final TeamRepository teamRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;

  public TeamResponseDTO createTeam(String name, CreateTeamRequestDTO createTeamRequestDTO) {
    var user = userRepository.findByEmail(name);

    //check name of team is exist or not
    if (teamRepository.existsByNameAndTeamMemberDetailsUserIdAndTeamMemberDetailsRole(createTeamRequestDTO.getName(), user.get().getId(),
        String.valueOf(TeamRole.ADMIN))) {
      throw new ConflictException("Team name is already exist");
    }

    Team team = new Team();
    team.setName(createTeamRequestDTO.getName());
    team.setMaxParticipant(createTeamRequestDTO.getMaxParticipant());

    TeamMemberDetail teamMemberDetail = new TeamMemberDetail();
    teamMemberDetail.setTeam(team);
    teamMemberDetail.setUser(user.get());
    teamMemberDetail.setRole(TeamRole.MEMBER);

    team.setTeamMemberDetails(List.of(teamMemberDetail));

    var result = modelMapper.map(teamRepository.save(team), TeamResponseDTO.class);
    result.setCreatorUserId(user.get().getId());

    return result;
  }
}
