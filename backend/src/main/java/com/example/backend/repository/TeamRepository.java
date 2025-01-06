package com.example.backend.repository;

import com.example.backend.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {

  boolean existsByName(String name);

  Page<Team> findAllByNameContainingIgnoreCase(String search, Pageable pageable);

  Page<Team> findByNameContainingIgnoreCase(String search, Pageable pageable);

  Page<Team> findAllByCreatorEmailAndNameContainingIgnoreCase(String email,String search, Pageable pageable);

  Page<Team> findAllByCreatorEmail(String email,Pageable pageable);

  @Query("SELECT t FROM Team t JOIN t.members m WHERE m.email = :email AND t.name LIKE %:search%")
  Page<Team> findJoinedTeamsByEmail(@Param("email") String email, @Param("search") String search, Pageable pageable);

}
