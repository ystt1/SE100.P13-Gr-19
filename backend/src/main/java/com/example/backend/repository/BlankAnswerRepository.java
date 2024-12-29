package com.example.backend.repository;

import com.example.backend.entity.BlankAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlankAnswerRepository extends JpaRepository<BlankAnswer, Integer> {
}
