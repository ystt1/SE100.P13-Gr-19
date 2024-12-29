package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizHistoryDetailDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.service.AnswerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
@AllArgsConstructor
public class AnswerController {

    private final AnswerService answerService;

    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(@RequestHeader("Authorization") String userEmail,
                                                    @RequestBody QuizSubmissionDTO submission) {
        QuizResultDTO result = answerService.submitQuiz(userEmail, submission);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/history")
    public ResponseEntity<List<?>> getQuizHistory(@RequestHeader("Authorization") String userEmail) {
        var history = answerService.getQuizHistory(userEmail);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/history/{resultId}/details")
    public ResponseEntity<List<QuizHistoryDetailDTO>> getHistoryDetails(@RequestHeader("Authorization") String userEmail,
                                                                        @PathVariable int resultId) {
        List<QuizHistoryDetailDTO> details = answerService.getHistoryDetail(resultId);
        return ResponseEntity.ok(details);
    }

}
