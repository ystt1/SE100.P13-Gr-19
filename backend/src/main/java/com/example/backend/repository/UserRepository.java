package com.example.backend.repository;

import com.example.backend.entity.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);

  Page<User> findByJoinedTeamsIdAndEmailContainingIgnoreCase(int teamId, String email, Pageable pageable);

  @Query("SELECT u FROM User u JOIN u.joinedTeams t WHERE t.id = :teamId " +
      "AND (:name IS NULL OR :name = '' OR u.name LIKE %:name%)")
  Page<User> findMembersByTeamIdWithSearchName(@Param("teamId") int teamId, @Param("name") String name, Pageable pageable);
}
