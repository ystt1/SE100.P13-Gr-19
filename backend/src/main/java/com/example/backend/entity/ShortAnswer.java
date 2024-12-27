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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_answer_id")
    private UserAnswer userAnswer;
}
