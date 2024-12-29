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
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_result")
    private Result result;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_quiz")
    private Quiz quiz;

    private double score;

    private boolean isCorrect; // Trạng thái đúng/sai

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    @OneToMany(mappedBy = "userAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ShortAnswer> shortAnswer;

    @OneToMany(mappedBy = "userAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlankAnswer> blankAnswers;

    @OneToMany(mappedBy = "userAnswer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizOptionAnswer> quizOptionAnswers;
}

