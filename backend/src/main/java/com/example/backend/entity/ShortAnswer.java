package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "short_answer")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShortAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String content;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_answer_id")
    private QuizAnswer quizAnswer;
}
