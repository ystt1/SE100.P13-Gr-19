package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "team")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    private String name;

    private int maxParticipant;

    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinTable(
        name = "team_member",
        joinColumns = @JoinColumn(name = "team_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    List<User> members;

    @ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "creator_id")
    private User creator;

    @OneToMany(mappedBy = "team",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<TeamQuizSetDetail> teamQuizSetDetails;

    @OneToMany(mappedBy = "team",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<JoinTeamRequest> joinTeamRequests;
}
