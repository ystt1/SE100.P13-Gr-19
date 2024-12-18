package com.example.backend.repository;

import com.example.backend.entity.Topic;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TopicRepository extends JpaRepository<Topic, Integer> {

  Optional<Object> findByName(String name);

  @Query("SELECT t FROM Topic t WHERE t.name = :name AND t.creator.email = :creatorEmail")
  Optional<Topic> findByNameAndCreatorEmail(@Param("name") String name, @Param("creatorEmail") String creatorEmail);

  Page<Topic> findAllByCreatorEmail(String email, Pageable pageable);

}
