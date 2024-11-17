package com.example.backend.repository;

import com.example.backend.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
}
