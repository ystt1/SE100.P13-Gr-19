package com.example.backend.DTO.Quiz;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.OptionDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerDTO;
import com.example.backend.DTO.Quiz.User.UserResponseDTO;
import com.example.backend.DTO.Topic.TopicSmallResponseDTO;
import com.example.backend.entity.QuestionType;
import java.util.Date;
import java.util.List;
import lombok.Data;

@Data
public class QuizResponseDTO {
  private int id;

  private String content;

  private QuestionType type;

  private TopicSmallResponseDTO topic;

  private UserResponseDTO creator;

  private Date createdAt;

  private List<OptionDTO> options;

  private List<BlankDTO> blanks;

  private ShortAnswerDTO shortAnswer;
}
