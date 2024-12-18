package com.example.backend.DTO.Practice;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PracticeQuizResponseDTO {

  int quizId;

  String content;

  List<String> answers;

  String correctAnswer;

  String chooseAnswer;
}
