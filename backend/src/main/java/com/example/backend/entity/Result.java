package com.example.backend.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "result")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_set_id")
    private QuizSet quizSet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    private int attemptTime;

    @OneToMany(mappedBy = "result",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<QuizAnswer> quizAnswers;

    private int numberCorrect;

    private LocalDateTime createdAt;

    private Integer completeTime;

    public void addQuizAnswer(QuizAnswer quizAnswer) {
        if (quizAnswers == null) {
            quizAnswers = new ArrayList<>();
        }
        quizAnswers.add(quizAnswer);
    }
}
