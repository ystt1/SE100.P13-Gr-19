package com.example.backend.service;

import com.example.backend.DTO.Report.ReportDTO;
import com.example.backend.entity.QuizSetReport;
import com.example.backend.entity.ReportStatus;
import com.example.backend.entity.User;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.QuizSetReportRepository;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ReportServiceTest {

    @Mock
    private QuizSetReportRepository quizSetReportRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ReportService reportService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateReport_Success() {
        String email = "user@example.com";
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(1);
        reportDTO.setStatus(ReportStatus.PENDING);

        User user = new User();
        user.setId(1);
        user.setEmail(email);

        QuizSetReport quizSetReport = new QuizSetReport();
        quizSetReport.setId(1);
        quizSetReport.setStatus(ReportStatus.PENDING);

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(modelMapper.map(reportDTO, QuizSetReport.class)).thenReturn(quizSetReport);
        when(quizSetReportRepository.save(any(QuizSetReport.class))).thenReturn(quizSetReport);
        when(modelMapper.map(any(QuizSetReport.class), eq(ReportDTO.class))).thenReturn(reportDTO);

        ResponseEntity<ReportDTO> response = reportService.createReport(email, reportDTO);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        verify(quizSetReportRepository, times(1)).save(any(QuizSetReport.class));
    }

    @Test
    void testCreateReport_Forbidden() {
        String email = "user@example.com";
        ReportDTO reportDTO = new ReportDTO();

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
            reportService.createReport(email, reportDTO);
        });

        assertEquals("You are not allowed to access this resource", exception.getMessage());
    }

    @Test
    void testGetAllReports_Success() {
        String email = "user@example.com";
        int page = 0, limit = 10;
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(1);
        reportDTO.setStatus(ReportStatus.PENDING);

        User user = new User();
        user.setEmail(email);

        QuizSetReport report = new QuizSetReport();
        report.setId(1);
        report.setStatus(ReportStatus.PENDING);

        Page<QuizSetReport> reportPage = new PageImpl<>(List.of(report));

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(quizSetReportRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(reportPage);
        when(modelMapper.map(any(QuizSetReport.class), eq(ReportDTO.class))).thenReturn(reportDTO);

        ResponseEntity<List<ReportDTO>> response = reportService.getAllReports(email, null, "asc", null, page, limit);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(quizSetReportRepository, times(1)).findAll(any(Specification.class), any(Pageable.class));
    }


    @Test
    void testGetAllReports_Forbidden() {
        String email = "user@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
            reportService.getAllReports(email, null, "asc", null, 0, 10);
        });

        assertEquals("You are not allowed to access this resource", exception.getMessage());
    }

    @Test
    void testSetStatusResolved_Success() {
        String email = "user@example.com";
        int id = 1;

        QuizSetReport report = new QuizSetReport();
        report.setId(id);
        report.setStatus(ReportStatus.PENDING);

        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setId(id);
        reportDTO.setStatus(ReportStatus.RESOLVED);

        when(quizSetReportRepository.findById(id)).thenReturn(Optional.of(report));
        when(quizSetReportRepository.save(any(QuizSetReport.class))).thenReturn(report);
        when(modelMapper.map(any(QuizSetReport.class), eq(ReportDTO.class))).thenReturn(reportDTO);

        ResponseEntity<ReportDTO> response = reportService.setStatusResolved(email, id, ReportStatus.RESOLVED);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(ReportStatus.RESOLVED, response.getBody().getStatus());
        verify(quizSetReportRepository, times(1)).save(report);
    }

    @Test
    void testSetStatusResolved_ReportNotFound() {
        String email = "user@example.com";
        int id = 1;

        when(quizSetReportRepository.findById(id)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            reportService.setStatusResolved(email, id, ReportStatus.RESOLVED);
        });

        assertEquals("Report not found with id: " + id, exception.getMessage());
    }

}
