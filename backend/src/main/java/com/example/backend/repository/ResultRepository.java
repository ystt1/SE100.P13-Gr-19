package com.example.backend.repository;

import com.example.backend.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {
    List<Result> findByUserId(int userId);

    @Query("SELECT COUNT(r) FROM Result r WHERE r.quizSet.id = :quizSetId")
    long countAttemptsByQuizSetId(@Param("quizSetId") int quizSetId);

    int countByQuizSetIdAndUserId(int quizSetId, int userId);

}
