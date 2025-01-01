package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizHistoryDetailDTO;
import com.example.backend.service.QuizHistoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz-history")
@AllArgsConstructor
public class QuizHistoryController {

    private final QuizHistoryService quizHistoryService;

    @GetMapping("/list")
    public ResponseEntity<List<?>> getQuizHistory(@RequestHeader("Authorization") String userEmail) {
        var history = quizHistoryService.getQuizHistory(userEmail);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/details/{resultId}")
    public ResponseEntity<List<QuizHistoryDetailDTO>> getHistoryDetails(@RequestHeader("Authorization") String userEmail,
                                                                        @PathVariable int resultId) {
        List<QuizHistoryDetailDTO> details = quizHistoryService.getHistoryDetail(userEmail, resultId);
        return ResponseEntity.ok(details);
    }
}
