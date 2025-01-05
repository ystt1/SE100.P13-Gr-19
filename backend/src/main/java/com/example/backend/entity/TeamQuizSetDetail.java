package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
public class TeamQuizSetDetail {
  @Id
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
