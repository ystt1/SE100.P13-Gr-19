package com.example.backend.DTO.Quiz.Quiz;

import com.example.backend.DTO.User.UserResponseDTO;
import com.example.backend.DTO.Topic.TopicSmallResponseDTO;
import com.example.backend.entity.QuestionType;
import java.util.Date;
import lombok.Data;

@Data
public class SmallQuizResponseDTO {

    private int id;

    private String content;

    private QuestionType type;

    private TopicSmallResponseDTO topic;

    private UserResponseDTO creator;

    private Date createdAt;
}
