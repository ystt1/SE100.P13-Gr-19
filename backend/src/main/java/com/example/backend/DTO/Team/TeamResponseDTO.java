package com.example.backend.DTO.Team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamResponseDTO {
    private int id;
    private String name;
    private int maxParticipant;
    private int creatorUserId;
}
