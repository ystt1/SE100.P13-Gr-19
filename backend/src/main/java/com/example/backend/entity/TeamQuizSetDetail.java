package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamQuizSetDetail {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  @ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
  @JoinColumn(name = "team_id")
  private Team team;

  @ManyToOne(fetch = jakarta.persistence.FetchType.EAGER)
  @JoinColumn(name = "quiz_set_id")
  private QuizSet quizSet;

  private LocalDateTime createdAt;
  private LocalDateTime startTime;
  private LocalDateTime endTime;
}
