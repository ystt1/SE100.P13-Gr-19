package com.example.backend.DTO.Quiz;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
import com.example.backend.entity.QuestionType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type", visible = true)
@JsonSubTypes({
    @JsonSubTypes.Type(value = BlankQuizRequestDTO.class, name = "FILL_IN_THE_BLANK"),
    @JsonSubTypes.Type(value = MultipleChoiceQuizRequestDTO.class, name = "MULTIPLE_CHOICE"),
    @JsonSubTypes.Type(value = ShortAnswerQuizRequestDTO.class, name = "SHORT_ANSWER"),
    @JsonSubTypes.Type(value = MultipleChoiceQuizRequestDTO.class, name = "SINGLE_CHOICE"),
    @JsonSubTypes.Type(value = BlankQuizRequestDTO.class, name = "DRAG_AND_DROP")
})
public class QuizRequestDTO {
  protected String content;

  protected QuestionType type;

  protected Integer topicId;
}
