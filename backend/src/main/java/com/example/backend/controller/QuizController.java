package com.example.backend.controller;

import com.example.backend.DTO.Quiz.Quiz.ListSmallQuizResponseDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.service.QuizService;
import java.security.Principal;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz")
@AllArgsConstructor
public class QuizController {

  private final QuizService quizService;

  @PostMapping
  public ResponseEntity<QuizResponseDTO> createQuiz(Principal principal, @RequestBody QuizRequestDTO quizRequestDTO) {
    return ResponseEntity.status(200).body(quizService.createQuiz(principal.getName(), quizRequestDTO));
  }

  @GetMapping("/{id}")
  public ResponseEntity<QuizResponseDTO> getQuizById(@PathVariable int id) {
    return ResponseEntity.status(200).body(quizService.getQuizById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizById(Principal principal,@PathVariable int id) {
    quizService.deleteQuizById(principal.getName(),id);
    return ResponseEntity.status(204).build();
  }

  @GetMapping("/all")
  public ResponseEntity<ListSmallQuizResponseDTO> getAllQuizzesOfUser(
      Principal principal,
      @RequestParam(defaultValue = "id") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return ResponseEntity.status(200).body(quizService.getAllQuizzes(principal.getName(), page, limit, sortElement, direction, search));
  }
}
