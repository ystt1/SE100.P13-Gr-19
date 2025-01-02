package com.example.backend.controller;

import com.example.backend.DTO.Practice.PracticeRequestDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.service.PracticeService;
import java.security.Principal;
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

    @PostMapping("/quizset/{id}")
    public ResponseEntity<QuizResultDTO> submitPractice(Principal principal,
                                                    @PathVariable int id,
                                                    @RequestBody PracticeRequestDTO practiceRequestDTO) {
        QuizResultDTO result = practiceService.submitPractice(principal.getName(), id, practiceRequestDTO);
        return ResponseEntity.ok(result);
    }
}