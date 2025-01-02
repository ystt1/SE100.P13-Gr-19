package com.example.backend.service;

import com.example.backend.DTO.Practice.PracticeRequestDTO;
import com.example.backend.DTO.Quiz.QuestionAnswerDTO;
import com.example.backend.DTO.Quiz.Quiz.QuizResponseDTO;
import com.example.backend.DTO.Quiz.QuizResultDTO;
import com.example.backend.DTO.Quiz.QuizSubmissionDTO;
import com.example.backend.DTO.QuizSet.QuizSetResponseDTO;
import com.example.backend.entity.*;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.*;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PracticeService {

    private final QuizSetRepository quizSetRepository;
    private final ModelMapper modelMapper;


    public List<QuizResponseDTO> getQuizzesForPractice(int id) {

        var quizSet = quizSetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz set not found"));

        List<QuizResponseDTO> quizzes = quizSet.getQuizList().stream()
                .map(quiz -> modelMapper.map(quiz, QuizResponseDTO.class))
                .collect(Collectors.toList());
        return quizzes;
    }

    public QuizResultDTO submitPractice(String name,int id, PracticeRequestDTO practiceRequestDTO) {
        //create new result record
        Result result = new Result();

        //save record for eachquiz
        return null;
    }
}
