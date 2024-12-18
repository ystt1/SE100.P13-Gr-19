package com.example.backend.repository;

import com.example.backend.entity.AttemptDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptDetailRepository extends JpaRepository<AttemptDetail, Integer> {

}
