package com.example.backend.repository;

import com.example.backend.entity.QuizSet;
import com.example.backend.entity.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {
    @Query("SELECT COUNT(r) FROM Result r WHERE r.quizSet.id = :quizSetId")
    long countAttemptsByQuizSetId(@Param("quizSetId") int quizSetId);

    int countByQuizSetIdAndUserId(int quizSetId, int userId);

    Page<Result> findByUserEmailAndQuizSetNameContainingIgnoreCase(String email, String search, Pageable pageable);
    Page<Result> findByUserEmail(String email, Pageable pageable);

    @Query("SELECT DISTINCT r.quizSet FROM Result r WHERE r.user.email = :email ORDER BY r.quizSet.createdTime DESC")
    List<QuizSet> findDistinctQuizSetByUserEmail(@Param("email") String email, Pageable pageable);

    Page<Result> findByQuizSetIdAndTeamIdAndUserEmailContainingIgnoreCase(int quizSetId, int teamId, String email, Pageable pageable);

    Page<Result> findByQuizSetIdAndTeamId(int quizSetId,int teamId, Pageable pageable);

    @Query("SELECT COALESCE(sum(r.numberCorrect), 0) FROM Result r WHERE r.user.id = :userId AND r.team.id = :teamId")
    int getTotalScoreByTeamIdAndUserId(@Param("teamId") int teamId,@Param("userId") int userId);

    Result findByQuizSetIdAndTeamIdAndUserId(int quizSetId, int teamId, int userId);
}
