package com.example.backend.repository;

import com.example.backend.entity.Quiz;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

  Page<Quiz> findByCreatorEmailAndContentContainingIgnoreCase(String email, String search, Pageable pageable);

  Page<Quiz> findByCreatorEmail(String email, Pageable pageable);

  Page<Quiz> findByCreatorEmailAndContentContainingIgnoreCaseAndTopicId(String email, String search, int topicId,
      Pageable pageable);

  Page<Quiz> findByCreatorEmailAndTopicId(String email, int topicId, Pageable pageable);

  Page<Quiz> findByTopicId(int topicId, Pageable pageable);

  Page<Quiz> findByContentContainingIgnoreCase(String search, Pageable pageable);

  Page<Quiz> findByContentContainingIgnoreCaseAndTopicId(String search, int topicId, Pageable pageable);
}
