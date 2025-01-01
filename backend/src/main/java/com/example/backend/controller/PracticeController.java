package com.example.backend.controller;

import com.example.backend.DTO.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.service.PracticeService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/practice")
@AllArgsConstructor
public class PracticeController {

    private final PracticeService practiceService;

    @GetMapping("/quizset/{id}")
    public ResponseEntity<List<QuizResponseDTO>> getQuizzesForPractice(@PathVariable int id) {
        var list = practiceService.getQuizzesForPractice(id);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResultDTO> submitQuiz(@RequestHeader("Authorization") String userEmail,
                                                    @RequestBody QuizSubmissionDTO submission) {
        QuizResultDTO result = practiceService.submitQuiz(userEmail, submission);
        return ResponseEntity.ok(result);
    }
}