package com.example.backend.controller;

import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.service.PracticeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

  private final PracticeService practiceService;
  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable int id) {
    return ResponseEntity.status(200).body(practiceService.getUserById(id));
  }
}
