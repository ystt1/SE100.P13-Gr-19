package com.example.backend.repository;

import com.example.backend.entity.QuizSetReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizSetReportRepository extends JpaRepository<QuizSetReport, Integer> {
  Page<QuizSetReport> findAll(Specification<QuizSetReport> spec, Pageable pageable);
}
