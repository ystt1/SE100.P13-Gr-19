package com.example.backend.DTO.Quiz.ShortAnswerQuiz;

import com.example.backend.DTO.Quiz.Quiz.QuizRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ShortAnswerQuizRequestDTO extends QuizRequestDTO {
  private ShortDTO answer;

  public void print() {
    System.out.println(content);
    System.out.println(type);
    System.out.println(answer);
  }

  public String toString() {
    return content + " " + type + " " + answer;
  }
}
