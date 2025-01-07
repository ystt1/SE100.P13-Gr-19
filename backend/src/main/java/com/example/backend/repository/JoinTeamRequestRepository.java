package com.example.backend.repository;

import com.example.backend.entity.JoinTeamRequest;
import com.example.backend.entity.RequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinTeamRequestRepository extends JpaRepository<JoinTeamRequest, Integer> {

  Page<JoinTeamRequest> findAllByIdAndStatusEquals(int id, RequestStatus status, Pageable pageable);

  Page<JoinTeamRequest> findAllById(int id, Pageable pageable);

  Page<JoinTeamRequest> findAllByTeamIdAndStatusEquals(int id, RequestStatus requestStatus, Pageable pageable);

  Page<JoinTeamRequest> findAllByTeamId(int id, Pageable pageable);

  boolean existsByTeamIdAndUserEmailAndStatusEquals(int id, String email, RequestStatus requestStatus);
}
