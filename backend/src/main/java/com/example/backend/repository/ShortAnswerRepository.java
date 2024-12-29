package com.example.backend.repository;

import com.example.backend.entity.ShortAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortAnswerRepository extends JpaRepository<ShortAnswer, Integer> {
}
