package com.example.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {

  @Id
  @GeneratedValue
  private int id;

  private String content;

  @ElementCollection
  private List<String> answers;

  @Enumerated(EnumType.STRING)
  private QuestionType type;

  private String correctAnswer;

  @Enumerated(EnumType.STRING)
  private DifficultyLevel difficulty;

  private Date createdAt=new Date();

  private Date lastUpdate=new Date();

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinColumn(name="topic_id")
  private Topic topic;

  @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
  @JoinColumn(name="quiz_set_id")
  private QuizSet quizSet;

}
