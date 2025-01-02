package com.example.backend.DTO.Practice;

import com.example.backend.DTO.Quiz.BlankQuiz.BlankQuizRequestDTO;
import com.example.backend.DTO.Quiz.MultipleChoiceQuiz.MultipleChoiceQuizRequestDTO;
import com.example.backend.DTO.Quiz.ShortAnswerQuiz.ShortAnswerQuizRequestDTO;
import com.example.backend.entity.QuestionType;
import com.example.backend.entity.ShortAnswer;
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
    @JsonSubTypes.Type(value = BlankAnswerDTO.class, name = "FILL_IN_THE_BLANK"),
    @JsonSubTypes.Type(value = MultipleChoiceAnswerDTO.class, name = "MULTIPLE_CHOICE"),
    @JsonSubTypes.Type(value = ShortAnswerDTO.class, name = "SHORT_ANSWER"),
    @JsonSubTypes.Type(value = MultipleChoiceAnswerDTO.class, name = "SINGLE_CHOICE"),
    @JsonSubTypes.Type(value = BlankAnswerDTO.class, name = "DRAG_AND_DROP")
})
public class Answer {
  protected Integer id;

  protected QuestionType type;
}