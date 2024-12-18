package com.example.backend.repository;

import com.example.backend.entity.QuizSetAttempt;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizSetAttemptRepository extends JpaRepository<QuizSetAttempt,Integer> {

  @Query("SELECT COALESCE(MAX(qsa.attempt), 0) FROM QuizSetAttempt qsa WHERE qsa.user.id = :userId AND qsa.quizSet.id = :quizSetId")
  int findMaxAttemptByUserIdAndQuizSetId(@Param("userId") int userId, @Param("quizSetId") int quizSetId);

  List<QuizSetAttempt> findAllByUserId(int userId);

}
