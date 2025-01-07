package com.example.backend.service;

import com.example.backend.DTO.Practice.ListSmallPracticeResultDTO;
import com.example.backend.DTO.Practice.SmallPracticeResultDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.DTO.Team.AddQuizSetDTO;
import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.JoinRequestDTO;
import com.example.backend.DTO.Team.ListJoinRequestDTO;
import com.example.backend.DTO.Team.ListMemberDTO;
import com.example.backend.DTO.Team.ListTeamDetailDTO;
import com.example.backend.DTO.Team.ListTeamResponseDTO;
import com.example.backend.DTO.Team.TeamDetail;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.DTO.Team.UserResponseWithScoreDTO;
import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.entity.JoinTeamRequest;
import com.example.backend.entity.RequestStatus;
import com.example.backend.entity.Result;
import com.example.backend.entity.Team;
import com.example.backend.entity.TeamQuizSetDetail;
import com.example.backend.entity.User;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.JoinTeamRequestRepository;
import com.example.backend.repository.QuizSetRepository;
import com.example.backend.repository.ResultRepository;
import com.example.backend.repository.TeamQuizSetDetailRepository;
import com.example.backend.repository.TeamRepository;
import com.example.backend.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.LogManager;
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
  private final QuizSetRepository quizSetRepository;
  private final TeamQuizSetDetailRepository teamQuizSetDetailRepository;
  private final ResultRepository resultRepository;


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
    result.setCurrentParticipant(0);

    return result;
  }

  public ListTeamDetailDTO getAllOfAllUser(String email,String sortElement,String direction,String search,int page,int limit) {
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
          var teamDTO = new TeamDetail();
          teamDTO.setId(team.getId());
          teamDTO.setName(team.getName());
          teamDTO.setMaxParticipant(team.getMaxParticipant());
          teamDTO.setCreatorUser(modelMapper.map(team.getCreator(), UserResponseDTO.class));
          teamDTO.setCurrentParticipant(team.getMembers().size());
          teamDTO.setStatus(getStatus(team,email));
          return teamDTO;})
        .collect(Collectors.toList());


    return ListTeamDetailDTO.builder()
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
          teamDTO.setCurrentParticipant(team.getMembers().size());
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
          teamDTO.setCurrentParticipant(team.getMembers().size());
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

  public JoinRequestDTO changeJoinRequestStatus(String email, int id, String status) {
    var joinRequest = joinTeamRequestRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Join request not found"));

    var team = joinRequest.getTeam();
    if (!team.getCreator().getEmail().equals(email)) {
      throw new ConflictException("You are not allowed to change the status of this join request");
    }

    RequestStatus requestStatus = Enum.valueOf(RequestStatus.class, status);
    joinRequest.setStatus(requestStatus);
    joinTeamRequestRepository.save(joinRequest);

    if(requestStatus == RequestStatus.ACCEPTED){
      addMemberToTeam(team, joinRequest.getUser());
    }

    return modelMapper.map(joinRequest, JoinRequestDTO.class);
  }

  public void addMemberToTeam(Team team, User user) {

    if(team.getMembers() == null){
      team.setMembers(new ArrayList<>());
    }

    if(team.getMembers().size() >= team.getMaxParticipant()){
      throw new ConflictException("Team is full");
    }

    if(team.getMembers().contains(user)){
      throw new ConflictException("User is already in the team");
    }

    team.getMembers().add(user);
    teamRepository.save(team);
  }

  public ListMemberDTO getMembers(int id, String sortElement, String direction, String search, int page, int limit) {
    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    var member = userRepository.findByJoinedTeamsIdAndEmailContainingIgnoreCase(id, search, pageable);

    var resultMembersDTO = member.stream().map(user ->{
      var dto = modelMapper.map(user, UserResponseWithScoreDTO.class);
      dto.setScore(resultRepository.getTotalScoreByTeamIdAndUserId(id, user.getId()));
      return dto;
    }).toList();

    return ListMemberDTO.builder()
        .members(resultMembersDTO)
        .totalElements((int)member.getTotalElements())
        .totalPages(member.getTotalPages())
        .currentPage(1)
        .build();
  }

  public void removeMember(String name, int id, int memberId) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    var user = userRepository.findById(memberId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    if(!team.getCreator().getEmail().equals(name)){
      throw new ConflictException("You are not allowed to remove member from this team");
    }

    if(!team.getMembers().contains(user)){
      throw new ConflictException("User is not in the team");
    }

    team.getMembers().remove(user);
    teamRepository.save(team);
  }


  public void leaveTeam(String email, int id) {
    Team team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    var user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

    if(!team.getMembers().contains(user))
    {
      throw new ConflictException("You are not in the team");
    }

    team.getMembers().remove(user);
    teamRepository.save(team);
  }


  public void addQuizSet(String email, int id, AddQuizSetDTO addQuizSetDTO) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    var quizSet = quizSetRepository.findById(addQuizSetDTO.getQuizSetId()).orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    if(!team.getCreator().getEmail().equals(email)){
      throw new ConflictException("You are not allowed to add quiz set to this team");
    }

    var teamQuizSetDetail = new TeamQuizSetDetail();
    teamQuizSetDetail.setTeam(team);
    teamQuizSetDetail.setQuizSet(quizSet);
    teamQuizSetDetail.setStartTime(addQuizSetDTO.getStartTime());
    teamQuizSetDetail.setEndTime(addQuizSetDTO.getEndTime());

    teamQuizSetDetailRepository.save(teamQuizSetDetail);
  }

  public void deleteQuizSet(String email, int id, int quizSetId) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));
    var quizSet = quizSetRepository.findById(quizSetId).orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

    if(!team.getCreator().getEmail().equals(email)){
      throw new ConflictException("You are not allowed to add quiz set to this team");
    }

    var teamQuizSetDetail = teamQuizSetDetailRepository.findByTeamAndQuizSet(team, quizSet)
        .orElseThrow(() -> new ResourceNotFoundException("TeamQuizSetDetail not found"));

    teamQuizSetDetailRepository.delete(teamQuizSetDetail);
  }

  public List<QuizSetResponseDTO> getQuizSet(String email, int id) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

    if(!team.getCreator().getEmail().equals(email)){
      throw new ForbiddenException("You are not allowed to view quiz set of this team");
    }

     return team.getTeamQuizSetDetails().stream().map(teamQuizSetDetail -> modelMapper.map(teamQuizSetDetail.getQuizSet(), QuizSetResponseDTO.class)).toList();

  }

  public void deleteTeam(String name, int id) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

    if(!team.getCreator().getEmail().equals(name)){
      throw new ForbiddenException("You are not allowed to delete this team");
    }

    teamRepository.delete(team);

  }

  public ListSmallPracticeResultDTO getAllPracticeResults(String email, int id, int quizSetId, String sortElement, String direction, String search,
      int page, int limit) {

    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement);
    Pageable pageable = PageRequest.of(page - 1, limit, sort);

    Page<Result> resultsPage;

    if (search != null && !search.isEmpty()) {
      resultsPage = resultRepository.findByQuizSetIdAndTeamIdAndUserEmailContainingIgnoreCase(quizSetId,id, search, pageable);
    } else {
      resultsPage = resultRepository.findByQuizSetIdAndTeamId(quizSetId,id, pageable);
    }

    List<SmallPracticeResultDTO> results = resultsPage.stream()
        .map(result -> modelMapper.map(result, SmallPracticeResultDTO.class))
        .toList();

    return ListSmallPracticeResultDTO.builder()
        .results(results)
        .totalPages(resultsPage.getTotalPages())
        .totalElements((int) resultsPage.getTotalElements())
        .build();

  }

  public TeamDetail getTeam(String email, int id) {
    var team = teamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

    var teamDTO = modelMapper.map(team, TeamDetail.class);
    teamDTO.setCurrentParticipant(team.getMembers().size());

    teamDTO.setStatus(getStatus(team,email));

    return teamDTO;
  }

  public String getStatus(Team team, String email) {
    String status;
    if(team.getCreator().getEmail().equals(email)){
      status = "CREATOR";
    }
    else if(team.getMembers().stream().anyMatch(user -> user.getEmail().equals(email))){
      status = "MEMBER";
    }
    else if(
        joinTeamRequestRepository.existsByTeamIdAndUserEmailAndStatusEquals(team.getId(),email,RequestStatus.PENDING)
    ){
      status = "PENDING";
    }
    else {
      status = "NONE";
    }
    return status;
  }
}
