package com.example.backend.repository;

import com.example.backend.entity.Quiz;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

  List<Quiz> findAllByQuizSetId(int id);
}
