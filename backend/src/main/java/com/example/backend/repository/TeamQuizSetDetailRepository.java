package com.example.backend.repository;

import com.example.backend.entity.Team;
import com.example.backend.entity.TeamQuizSetDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamQuizSetDetailRepository extends JpaRepository<TeamQuizSetDetail, Integer> {

}
