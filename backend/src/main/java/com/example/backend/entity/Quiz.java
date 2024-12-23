package com.example.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class Quiz {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private int id;

  private String content;

  @Enumerated(EnumType.STRING)
  private QuestionType type;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "topic_id")
  private Topic topic;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "creator_id")
  private User creator;

  private Date createdAt=new Date();

  @OneToMany(mappedBy = "quiz", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
  private List<QuizOption> options;

  @OneToMany(mappedBy = "quiz", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
  private List<Blank> blanks;

  @OneToOne(mappedBy = "quiz", cascade = {CascadeType.ALL})
  private ShortAnswer shortAnswer;
}
