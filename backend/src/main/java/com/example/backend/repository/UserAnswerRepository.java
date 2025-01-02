package com.example.backend.repository;

import com.example.backend.entity.QuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAnswerRepository extends JpaRepository<QuizAnswer, Integer> {
    List<QuizAnswer> findByResultId(int resultId);
}

