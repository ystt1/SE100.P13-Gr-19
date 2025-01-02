package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blank_answer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlankAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String content;

    private int blankOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_answer_id")
    private QuizAnswer quizAnswer;
}
