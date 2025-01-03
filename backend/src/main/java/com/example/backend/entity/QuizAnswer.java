package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "quiz_answer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "result_id")
    private Result result;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Boolean isCorrect;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @OneToOne(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ShortAnswer shortAnswer;

    @OneToMany(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlankAnswer> blankAnswers;

    @OneToMany(mappedBy = "quizAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizOptionAnswer> quizOptionAnswers;
}

