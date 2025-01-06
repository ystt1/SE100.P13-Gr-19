package com.example.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "join_team_request")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JoinTeamRequest {
  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.SEQUENCE)
  private int id;

  @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH})
  @JoinColumn(name = "team_id")
  private Team team;

  @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH})
  @JoinColumn(name = "user_id")
  private User user;

  @Enumerated(jakarta.persistence.EnumType.STRING)
  private RequestStatus status;

}
