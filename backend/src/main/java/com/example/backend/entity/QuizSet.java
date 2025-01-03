package com.example.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.SequenceGenerator;
import java.sql.Timestamp;
import java.time.Duration;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_set")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSet {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String name;

  private String description;

  private Date createdTime;

  private Date updatedTime;

  private Boolean allowShowAnswer=true;

  private Long timeLimit;

  private Integer totalQuestion;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "creator_id")
  private User creator;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "quiz_set_detail",
      joinColumns = @JoinColumn(name = "quiz_set_id"),
      inverseJoinColumns = @JoinColumn(name = "quiz_id")
  )
  private List<Quiz> quizList;
}
