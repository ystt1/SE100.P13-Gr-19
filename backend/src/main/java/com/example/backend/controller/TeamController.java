package com.example.backend.controller;

import com.example.backend.DTO.Team.ChangeStatusDTO;
import com.example.backend.DTO.Team.CreateTeamRequestDTO;
import com.example.backend.DTO.Team.JoinRequestDTO;
import com.example.backend.DTO.Team.ListJoinRequestDTO;
import com.example.backend.DTO.Team.ListMemberDTO;
import com.example.backend.DTO.Team.ListTeamResponseDTO;
import com.example.backend.DTO.Team.TeamResponseDTO;
import com.example.backend.service.TeamService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<ListTeamResponseDTO> getAllOfAllUser(
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(defaultValue = "") String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(teamService.getAllOfAllUser(sortElement, direction, search, page, limit));
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
  public ResponseEntity<ListMemberDTO> getMembers(@PathVariable int id) {
    return ResponseEntity.status(200).body(teamService.getMembers(id));
  }
}
