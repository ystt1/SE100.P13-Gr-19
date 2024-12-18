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

  @GetMapping("/all")
  public ListQuizSetDTO getAllQuizSets(Principal principal,
      @RequestParam(required = false) String sortElement,
      @RequestParam(required = false) String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int topicId) {
    return quizSetService.getAllQuizSetsByUserEmail(principal.getName(), sortElement,direction, search, page, limit, topicId);
  }

  @GetMapping("/all-of-all-user")
  public ListQuizSetDTO getAllQuizSetsOfAllUser(
      @RequestParam(required = false) String sortElement,
      @RequestParam(required = false) String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit,
      @RequestParam(defaultValue = "0") int topicId) {
    return quizSetService.getAllQuizSetsByUserEmail(null, sortElement,direction, search, page, limit, topicId);
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
      return quizSetService.getQuizSetById(principal.getName(),id);
  }

  @PostMapping
  public ResponseEntity<QuizSetResponseDTO> createQuizSet(Principal principal,@RequestBody QuizSetRequestDTO quizSetRequestDTO) {
      return quizSetService.createQuizSet(principal.getName(), quizSetRequestDTO);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteQuizSet(Principal principal, @PathVariable int id) {
      return quizSetService.deleteQuizSet(principal.getName(), id);
  }

  @PostMapping("/{id}")
  public ResponseEntity<QuizDTO> addQuizToQuizSet(Principal principal,@PathVariable int id,@RequestBody QuizDTO quizDTO) {
      return quizSetService.addQuizToQuizSet(principal.getName(),id, quizDTO);
  }

  @PostMapping("/{id}/quizzes")
  public ResponseEntity<QuizSetResponseDTO> addMultipleQuizToQuizSet(Principal principal,@PathVariable int id,@RequestBody List<QuizDTO> quizDTOs) {
      return quizSetService.addMultipleQuizToQuizSet(principal.getName(),id, quizDTOs);
  }

  @PatchMapping("/{id}/allow-show-answer")
  public ResponseEntity<QuizSetResponseDTO> allowShowAnswer(Principal principal, @PathVariable int id) {
      return quizSetService.allowShowAnswer(principal.getName(), id);
  }

  @PatchMapping("/{id}/disable-show-answer")
  public ResponseEntity<QuizSetResponseDTO> disable(Principal principal, @PathVariable int id) {
    return quizSetService.disableShowAnswer(principal.getName(), id);
  }

  @PostMapping("/{id}/bookmark")
  public ResponseEntity<String> addToBookmark(Principal principal, @PathVariable int id) {
    return quizSetService.addToBookmark(principal.getName(), id);
  }

  @DeleteMapping("/{id}/bookmark")
  public ResponseEntity<String> removeFromBookmark(Principal principal, @PathVariable int id) {
    return quizSetService.removeFromBookmark(principal.getName(), id);
  }

}
