package com.example.backend.controller;

import com.example.backend.DTO.Report.ReportDTO;
import com.example.backend.entity.ReportStatus;
import com.example.backend.service.ReportService;
import java.security.Principal;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@AllArgsConstructor
public class ReportController {

  ReportService reportService;

  @PostMapping
  public ResponseEntity<ReportDTO> createReport(Principal principal, @RequestBody ReportDTO reportDTO) {
    return reportService.createReport(principal.getName(), reportDTO);
  }

  @GetMapping("/all")
  public ResponseEntity<List<ReportDTO>> getAllReports(
      Principal principal,
      @RequestParam(required = false) String sortElement,
      @RequestParam(required = false) String direction,
      @RequestParam(required = false) String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int limit) {
    return reportService.getAllReports(principal.getName(), sortElement,  direction,  search,  page,  limit);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ReportDTO> setStatusResolved(Principal principal,@PathVariable int id,@RequestParam ReportStatus status) {
    return reportService.setStatusResolved(principal.getName(),id, status);
  }
}
