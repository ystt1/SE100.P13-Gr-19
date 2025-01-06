package com.example.backend.service;

import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.JoinRequestDTO;
import com.example.backend.DTO.Team.ListJoinRequestDTO;
import com.example.backend.DTO.Team.ListTeamResponseDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.entity.JoinTeamRequest;
import com.example.backend.entity.RequestStatus;
import com.example.backend.entity.Team;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.JoinTeamRequestRepository;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserRepository;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamService {

  private final TeamRepository teamRepository;
  private final UserRepository userRepository;
  private final ModelMapper modelMapper;
  private final JoinTeamRequestRepository joinTeamRequestRepository;

  public TeamResponseDTO createTeam(String name, CreateTeamRequestDTO createTeamRequestDTO) {
    var user = userRepository.findByEmail(name);

    //check name of team is exist or not
    if (teamRepository.existsByName(createTeamRequestDTO.getName())){
      throw new ConflictException("Team name is already exist");
    }

    Team team = new Team();
    team.setName(createTeamRequestDTO.getName());
    team.setMaxParticipant(createTeamRequestDTO.getMaxParticipant());
    team.setCreator(user.get());

    var result = modelMapper.map(teamRepository.save(team), TeamResponseDTO.class);
    result.setCreatorUser(modelMapper.map(team.getCreator(), UserResponseDTO.class));

    return result;
  }

  public ListTeamResponseDTO getAllOfAllUser(String sortElement,String direction,String search,int page,int limit) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Team> teamsPage;

    if (search != null && !search.isEmpty()) {
      teamsPage = teamRepository.findByNameContainingIgnoreCase(search, pageable);
    } else {
      teamsPage = teamRepository.findAll(pageable);
    }

    var result = teamsPage.stream()
        .map(team -> {
          var teamDTO = new TeamResponseDTO();
          teamDTO.setId(team.getId());
          teamDTO.setName(team.getName());
          teamDTO.setMaxParticipant(team.getMaxParticipant());
          teamDTO.setCreatorUser(modelMapper.map(team.getCreator(), UserResponseDTO.class));
          return teamDTO;})
        .collect(Collectors.toList());


    return ListTeamResponseDTO.builder()
        .teams(result)
        .totalElements((int)teamsPage.getTotalElements())
        .totalPages(teamsPage.getTotalPages())
        .currentPage(page)
        .build();
  }

  public ListTeamResponseDTO getMyTeams(String email, String sortElement, String direction, String search, int page, int limit) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Team> teamsPage;

    if (search != null && !search.isEmpty()) {
      teamsPage = teamRepository.findAllByCreatorEmailAndNameContainingIgnoreCase(email,search, pageable);
    } else {
      teamsPage = teamRepository.findAllByCreatorEmail(email,pageable);
    }

    var result = teamsPage.stream()
        .map(team -> {
          var teamDTO = new TeamResponseDTO();
          teamDTO.setId(team.getId());
          teamDTO.setName(team.getName());
          teamDTO.setMaxParticipant(team.getMaxParticipant());
          teamDTO.setCreatorUser(modelMapper.map(team.getCreator(), UserResponseDTO.class));
          return teamDTO;})
        .collect(Collectors.toList());


    return ListTeamResponseDTO.builder()
        .teams(result)
        .totalElements((int)teamsPage.getTotalElements())
        .totalPages(teamsPage.getTotalPages())
        .currentPage(page)
        .build();
  }

  public ListTeamResponseDTO getJoinedTeam(String email, String sortElement, String direction, String search, int page, int limit) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Team> teamsPage = teamRepository.findJoinedTeamsByEmail(email, search, pageable);

    var result = teamsPage.stream()
        .map(team -> {
          var teamDTO = new TeamResponseDTO();
          teamDTO.setId(team.getId());
          teamDTO.setName(team.getName());
          teamDTO.setMaxParticipant(team.getMaxParticipant());
          teamDTO.setCreatorUser(modelMapper.map(team.getCreator(), UserResponseDTO.class));
          return teamDTO;
        })
        .collect(Collectors.toList());

    return ListTeamResponseDTO.builder()
        .teams(result)
        .totalElements((int) teamsPage.getTotalElements())
        .totalPages(teamsPage.getTotalPages())
        .currentPage(page)
        .build();
  }

  public void sendJoinRequest(String name, int id) {
    var user = userRepository.findByEmail(name);
    var team = teamRepository.findById(id);

    if (team.isEmpty()){
      throw new ResourceNotFoundException("Team not found");
    }

    var request = new JoinTeamRequest();
    request.setUser(user.get());
    request.setTeam(team.get());
    request.setStatus(RequestStatus.PENDING);

    joinTeamRequestRepository.save(request);
  }

  public ListJoinRequestDTO getJoinRequests(String email, int id, String sortElement, String direction, String status, int page, int limit) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    if(!team.getCreator().getEmail().equals(email)){
      throw new ConflictException("You are not allowed to view join requests of this team");
    }

    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<JoinTeamRequest> requestPage;

    if(status != null && !status.isEmpty()){
      RequestStatus requestStatus = Enum.valueOf(RequestStatus.class, status);
      requestPage = joinTeamRequestRepository.findAllByTeamIdAndStatusEquals(id,requestStatus,pageable);
    }
    else {
      requestPage = joinTeamRequestRepository.findAllByTeamId(id,pageable);
    }

    var result = requestPage.stream().map(request->modelMapper.map(request, JoinRequestDTO.class)).toList();

    return ListJoinRequestDTO.builder()
        .joinRequests(result)
        .totalElements((int) requestPage.getTotalElements())
        .totalPages(requestPage.getTotalPages())
        .currentPage(page)
        .build();
  }
}
