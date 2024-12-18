package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_set_report")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSetReport {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  @ManyToOne
  @JoinColumn(name = "quiz_set_id")
  private QuizSet quizSet;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Enumerated(EnumType.STRING)
  private ReportType type;

  private String description;

  @Enumerated(EnumType.STRING)
  private ReportStatus status;

  private Date createdDate;
}
