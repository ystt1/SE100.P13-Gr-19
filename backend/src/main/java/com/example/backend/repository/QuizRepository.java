package com.example.backend.repository;

import com.example.backend.entity.Quiz;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

  Page<Quiz> findByCreatorEmailAndContentContainingIgnoreCase(String email, String search, Pageable pageable);

  Page<Quiz> findByCreatorEmail(String email, Pageable pageable);
}
