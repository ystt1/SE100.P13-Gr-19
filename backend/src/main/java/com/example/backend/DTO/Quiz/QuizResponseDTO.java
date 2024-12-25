package com.example.backend.DTO.Quiz;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.OptionDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerDTO;
import com.example.backend.entity.QuestionType;
import com.example.backend.entity.Topic;
import com.example.backend.entity.User;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class QuizResponseDTO {
  private int id;

  private String content;

  private QuestionType type;

  private Topic topic;

  private User creator;

  private Date createdAt;

  private List<OptionDTO> options;

  private List<BlankDTO> blanks;

  private ShortAnswerDTO shortAnswer;
}
