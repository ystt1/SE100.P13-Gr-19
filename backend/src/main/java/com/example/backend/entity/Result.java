package com.example.backend.entity;

import jakarta.persistence.*;
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

    @Column(name = "id_class")
    private Integer idClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_quiz_set")
    private QuizSet quizSet;

    private double score;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Column(name = "complete_time")
    private double completeTime;

    @Column(name = "number_answer_time")
    private int numberAnswerTime;
}
