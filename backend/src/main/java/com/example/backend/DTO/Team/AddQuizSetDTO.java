package com.example.backend.DTO.Team;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AddQuizSetDTO {
    int quizSetId;
    LocalDateTime startTime;
    LocalDateTime endTime;
}
