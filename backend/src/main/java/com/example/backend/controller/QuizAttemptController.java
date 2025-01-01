package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.service.QuizAttemptService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz-attempt")
@AllArgsConstructor
public class QuizAttemptController {

    private final QuizAttemptService quizAttemptService;

    @GetMapping("/quizset/{id}")
    public ResponseEntity<QuizSetResponseDTO> getQuizSetForAttempt(@PathVariable int id) {
        QuizSetResponseDTO quizSet = quizAttemptService.getQuizSetForAttempt(id);
        return ResponseEntity.ok(quizSet);
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(@RequestHeader("Authorization") String userEmail,
                                                    @RequestBody QuizSubmissionDTO submission) {
        QuizResultDTO result = quizAttemptService.submitQuiz(userEmail, submission);
        return ResponseEntity.ok(result);
    }
}