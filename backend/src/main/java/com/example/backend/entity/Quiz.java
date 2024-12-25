package com.example.backend.entity;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

  @OneToMany(mappedBy = "quiz", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  private List<QuizOption> options;

  @OneToMany(mappedBy = "quiz", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  private List<Blank> blanks;

  @OneToOne(mappedBy = "quiz", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
  private ShortAnswer shortAnswer;

  public void setAnswerFromDTO(ShortAnswerQuizRequestDTO shortAnswerQuizRequestDTO){
    ShortAnswer shortAnswer = ShortAnswer.builder().content(shortAnswerQuizRequestDTO.getAnswer().getContent()).quiz(this).build();
    this.setShortAnswer(shortAnswer);
  }

  public void setAnswerFromDTO(MultipleChoiceQuizRequestDTO multipleChoiceQuizRequestDTO){
    List<QuizOption> quizOptions = multipleChoiceQuizRequestDTO.getOptions().stream().map(optionDTO -> {
      return QuizOption.builder().content(optionDTO.getContent()).isCorrect(optionDTO.getIsCorrect()).quiz(this).build();
    }).toList();

    this.setOptions(quizOptions);
  }

  public void setAnswerFromDTO(BlankQuizRequestDTO blankQuizRequestDTO){
    List<Blank> blanks = blankQuizRequestDTO.getBlanks().stream().map(blankDTO -> {
      return Blank.builder().blankOrder(blankDTO.getOrder()).content(blankDTO.getContent()).quiz(this).build();
    }).toList();

    this.setBlanks(blanks);
  }

}
