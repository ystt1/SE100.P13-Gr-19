package com.example.backend.DTO.Quiz.Quiz;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ListQuizIdDTO {
 List<Integer> quizIds;
}
