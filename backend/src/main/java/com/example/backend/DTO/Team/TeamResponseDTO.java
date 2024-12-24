package com.example.backend.DTO.Team;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TeamResponseDTO {
    private int id;
    private String name;
    private String description;
    private int creatorId;
    private List<Integer> memberIds;
}
