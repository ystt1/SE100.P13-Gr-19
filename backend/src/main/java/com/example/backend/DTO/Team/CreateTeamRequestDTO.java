package com.example.backend.DTO.Team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTeamRequestDTO {
    private String name;
    private Integer maxParticipant;
}
