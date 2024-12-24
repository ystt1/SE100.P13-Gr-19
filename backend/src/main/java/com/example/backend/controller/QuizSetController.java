package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizDTO;
import com.example.backend.DTO.QuizSet.ListQuizSetDTO;
import com.example.backend.DTO.QuizSet.QuizSetRequestDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.service.QuizService;
import com.example.backend.service.QuizSetService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/quiz-set")
@AllArgsConstructor
public class QuizSetController {

  private final QuizSetService quizSetService;

  @PostMapping
  public ResponseEntity<QuizSetResponseDTO> createQuizSet(Principal principal,@RequestBody QuizSetRequestDTO quizSetRequestDTO) {
    return ResponseEntity.status(200).body(quizSetService.createQuizSet(principal.getName(), quizSetRequestDTO));
  }

  @GetMapping("/all")
  public ResponseEntity<ListQuizSetDTO> getAllQuizSetsOfUser(Principal principal,
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int topicId) {
    return ResponseEntity.status(200).body(quizSetService.getAllQuizSetsByUserEmail(principal.getName(), sortElement,direction, search, page, limit, topicId));
  }

  @GetMapping("/all-of-all-user")
  public ResponseEntity<ListQuizSetDTO> getAllQuizSetsOfAllUser(
      @RequestParam(defaultValue = "name") String sortElement,
      @RequestParam(defaultValue = "asc") String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int topicId) {
    return ResponseEntity.status(200).body(quizSetService.getAllQuizSetsByUserEmail(null, sortElement,direction, search, page, limit, topicId));
  }

  @GetMapping("/random")
  public ListQuizSetDTO getRandomQuizSet(@RequestParam(defaultValue = "10") int limit) {
    return quizSetService.getRandomQuizSet(limit);
  }

  @GetMapping("/bookmarks")
  public ListQuizSetDTO getAllBookmarkQuizSets(Principal principal,
      @RequestParam(required = false) String sortElement,
      @RequestParam(required = false) String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int topicId) {
    return quizSetService.getAllBookmarkQuizSetsByUserEmail(principal.getName(), sortElement,direction, search, page, limit, topicId);
  }

  @GetMapping("/{id}")
  public ResponseEntity<QuizSetResponseDTO> getQuizSetById(Principal principal, @PathVariable int id) {
    return ResponseEntity.status(200).body(quizSetService.getQuizSetById(principal.getName(),id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizSet(Principal principal, @PathVariable int id) {
    quizSetService.deleteQuizSet(principal.getName(), id);
    return ResponseEntity.status(200).build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<QuizSetResponseDTO> updateQuizSet(Principal principal, @PathVariable int id, @RequestBody QuizSetRequestDTO quizSetRequestDTO) {
    return ResponseEntity.status(200).body(quizSetService.updateQuizSet(principal.getName(), id, quizSetRequestDTO));
  }

  @PostMapping("/{id}")
  public ResponseEntity<String> addQuizToQuizSet(Principal principal,@PathVariable int id,@RequestBody QuizDTO quizDTO) {
    quizSetService.addQuizToQuizSet(principal.getName(),id, quizDTO);
    return ResponseEntity.status(200).body("Quiz added to quiz set");
  }

  @PatchMapping("/{id}/allow-show-answer")
  public ResponseEntity<String> allowShowAnswer(Principal principal, @PathVariable int id) {
    quizSetService.allowShowAnswer(principal.getName(), id);
    return ResponseEntity.status(200).body("Show answer allowed");
  }

  @PatchMapping("/{id}/disable-show-answer")
  public ResponseEntity<String> disable(Principal principal, @PathVariable int id) {
    quizSetService.disableShowAnswer(principal.getName(), id);
    return ResponseEntity.status(200).body("Show answer disabled");
  }

  @PostMapping("/{id}/bookmark")
  public ResponseEntity<String> addToBookmark(Principal principal, @PathVariable int id) {
    quizSetService.addToBookmark(principal.getName(), id);
    return ResponseEntity.status(200).body("Quiz set added to bookmark");
  }

  @DeleteMapping("/{id}/bookmark")
  public ResponseEntity<String> removeFromBookmark(Principal principal, @PathVariable int id) {
    quizSetService.removeFromBookmark(principal.getName(), id);
    return ResponseEntity.status(200).body("Quiz set removed from bookmark");
  }

}
