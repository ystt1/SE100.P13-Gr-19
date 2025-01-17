package com.example.backend.controller;

import com.example.backend.DTO.Practice.ListSmallPracticeResultDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.DTO.Team.AddQuizSetDTO;
import com.example.backend.DTO.Team.ChangeStatusDTO;
import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.JoinRequestDTO;
import com.example.backend.DTO.Team.ListJoinRequestDTO;
import com.example.backend.DTO.Team.ListMemberDTO;
import com.example.backend.DTO.Team.ListTeamDetailDTO;
import com.example.backend.DTO.Team.ListTeamResponseDTO;
import com.example.backend.DTO.Team.TeamDetail;
import com.example.backend.DTO.Team.TeamQuizSetResult;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.service.TeamService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

  @GetMapping("/all")
  public ResponseEntity<ListTeamDetailDTO> getAllOfAllUser(
      Principal principal,
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getAllOfAllUser(principal.getName(),sortElement, direction, search, page, limit));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteTeam(Principal principal, @PathVariable int id) {
    teamService.deleteTeam(principal.getName(), id);
    return ResponseEntity.status(200).body("Team deleted");
  }

  @GetMapping("/my-teams")
  public ResponseEntity<ListTeamResponseDTO> getAllMyTeams(
      Principal principal,
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getMyTeams(principal.getName(),sortElement, direction, search, page, limit));
  }

  @GetMapping("/joined-teams")
  public ResponseEntity<ListTeamResponseDTO> getJoinedTeam(
      Principal principal,
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getJoinedTeam(principal.getName(),sortElement, direction, search, page, limit));
  }

  @PostMapping("/{id}/join")
  public ResponseEntity<String> sendJoinRequest(Principal principal, @PathVariable int id) {
    teamService.sendJoinRequest(principal.getName(), id);
    return ResponseEntity.status(200).body("Join request sent");
  }

  @GetMapping("/{id}/join-requests")
  public ResponseEntity<ListJoinRequestDTO> getJoinRequests(
      Principal principal,
      @PathVariable int id,
      @RequestParam(defaultValue = "id") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String status,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getJoinRequests(principal.getName(), id, sortElement, direction, status, page, limit));
  }

  @PatchMapping("/join-request/{id}")
  public ResponseEntity<JoinRequestDTO> changeJoinRequestStatus(Principal principal, @PathVariable int id, @RequestBody ChangeStatusDTO statusDTO) {
    return ResponseEntity.status(200).body(teamService.changeJoinRequestStatus(principal.getName(), id, statusDTO.getStatus()));
  }

  @GetMapping("/{id}/members")
  public ResponseEntity<ListMemberDTO> getMembers(
      @PathVariable int id,
      @RequestParam(defaultValue = "id") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getMembers(id, sortElement, direction, search, page, limit));
  }

  @DeleteMapping("/{id}/members/{memberId}")
  public ResponseEntity<String> removeMember(Principal principal,@PathVariable int id, @PathVariable int memberId) {
    teamService.removeMember(principal.getName(),id, memberId);
    return ResponseEntity.status(200).body("Member removed");
  }

  @DeleteMapping("/{id}/leave")
  public ResponseEntity<String> leaveTeam(Principal principal, @PathVariable int id) {
    teamService.leaveTeam(principal.getName(), id);
    return ResponseEntity.status(200).body("Leave team successfully");
  }

  @PostMapping("/{id}/quiz-set")
  public ResponseEntity<String> addQuizSet(Principal principal, @PathVariable int id, @RequestBody AddQuizSetDTO addQuizSetDTO) {
    teamService.addQuizSet(principal.getName(), id, addQuizSetDTO);
    return ResponseEntity.status(200).body("Quiz set added");
  }

  @GetMapping("/{id}/quiz-set")
  public ResponseEntity<List<QuizSetResponseDTO>> getQuizSet(Principal principal, @PathVariable int id) {
    return ResponseEntity.status(200).body(teamService.getQuizSet(principal.getName(), id));
  }

  @DeleteMapping("/{id}/quiz-set/{quizSetId}")
  public ResponseEntity<String> removeQuizSet(Principal principal, @PathVariable int id, @PathVariable int quizSetId) {
    teamService.deleteQuizSet(principal.getName(), id, quizSetId);
    return ResponseEntity.status(200).body("Quiz set removed");
  }

  @GetMapping("/{id}/quiz-set/{quizSetId}/practice")
  public ResponseEntity<ListSmallPracticeResultDTO> getAllPracticeResults(Principal principal,
      @PathVariable int id,
      @PathVariable int quizSetId,
      @RequestParam(defaultValue = "createdAt") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    var results = teamService.getAllPracticeResults(principal.getName(), id,quizSetId,sortElement, direction, search, page, limit);
    return ResponseEntity.ok(results);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TeamDetail> getTeam(Principal principal, @PathVariable int id) {
    return ResponseEntity.status(200).body(teamService.getTeam(principal.getName(), id));
  }

@GetMapping("/{id}/quiz-set/{quizSetId}/result")
  public ResponseEntity<TeamQuizSetResult> getQuizSetResult(@PathVariable int id, @PathVariable int quizSetId) {
    return ResponseEntity.status(200).body(teamService.getTeamQuizSetResult( id, quizSetId));
  }
}
