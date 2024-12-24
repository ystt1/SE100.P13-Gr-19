package com.example.backend.DTO.Quiz;

import com.example.backend.entity.QuestionType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.util.List;
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
    @JsonSubTypes.Type(value = ShortAnswerQuizRequestDTO.class, name = "SHORT_ANSWER")
})
public class QuizRequestDTO {
  protected Integer id;

  protected String content;

  protected String type;
}
