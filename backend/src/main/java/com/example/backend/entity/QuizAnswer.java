package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user_answer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id")
    private Result result;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private boolean isCorrect;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @OneToMany(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShortAnswer> shortAnswer;

    @OneToMany(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlankAnswer> blankAnswers;

    @OneToMany(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizOptionAnswer> quizOptionAnswers;
}

