package com.example.backend.entity;

import jakarta.persistence.Entity;
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
@Table(name = "quiz_option")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizOption {

  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.SEQUENCE)
  private int id;

  private String content;

  private Boolean isCorrect;

  @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
  @JoinColumn(name = "quiz_id")
  private Quiz quiz;

  public String toString() {
    return "QuizOption(content=" + this.getContent() + ", isCorrect=" + this.getIsCorrect() + ")";
  }

}
