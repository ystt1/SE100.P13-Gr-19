package com.example.backend.service;

import com.example.backend.DTO.Report.ReportDTO;
import com.example.backend.entity.QuizSet;
import com.example.backend.entity.QuizSetReport;
import com.example.backend.entity.ReportStatus;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizSetReportRepository;
import com.example.backend.repository.UserRepository;
import jakarta.persistence.criteria.Predicate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportService {

  QuizSetReportRepository quizSetReportRepository;

  UserRepository userRepository;

  ModelMapper modelMapper;

  public ResponseEntity<ReportDTO> createReport(String email, ReportDTO reportDTO) {
    var userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
      throw new ForbiddenException("You are not allowed to access this resource");
    }
    var user = userOptional.get();

    reportDTO.setUserId(user.getId());

    QuizSetReport quizSetReport = modelMapper.map(reportDTO, QuizSetReport.class);
    quizSetReport.setStatus(ReportStatus.PENDING);
    quizSetReport.setCreatedDate(new java.util.Date());

    var result = quizSetReportRepository.save(quizSetReport);

    return ResponseEntity.ok(modelMapper.map(result, ReportDTO.class));
  }


  public ResponseEntity<List<ReportDTO>> getAllReports(String email, String sortElement, String direction, String search, int page, int limit) {
    var userOptional = userRepository.findByEmail(email);
    if (userOptional.isEmpty()) {
      throw new ForbiddenException("You are not allowed to access this resource");
    }

    if (direction == null) {
      direction = "asc";
    }

    Sort sort = Sort.by(Sort.Direction.fromString(direction), sortElement != null ? sortElement : "id");
    Pageable pageable = PageRequest.of(page, limit, sort);

    Specification<QuizSetReport> spec = (root, query, criteriaBuilder) -> {
      Predicate predicate = criteriaBuilder.conjunction();
      if (search != null && !search.isEmpty()) {
        predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("status"), "%" + search + "%"));
      }
      return predicate;
    };

    Page<QuizSetReport> reportPage = quizSetReportRepository.findAll(spec, pageable);

    List<ReportDTO> reportDTOs = reportPage.getContent().stream()
            .map(report -> modelMapper.map(report, ReportDTO.class))
            .collect(Collectors.toList());

    return ResponseEntity.ok(reportDTOs);
  }

  public ResponseEntity<ReportDTO> setStatusResolved(String email, int id, ReportStatus status) {
    var report = quizSetReportRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Report not found with id: " + id));

    report.setStatus(ReportStatus.RESOLVED);
    var result = quizSetReportRepository.save(report);
    return ResponseEntity.ok(modelMapper.map(result, ReportDTO.class));
  }
}
