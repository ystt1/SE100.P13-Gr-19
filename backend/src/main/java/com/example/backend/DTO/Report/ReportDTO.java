package com.example.backend.DTO.Report;

import com.example.backend.entity.ReportStatus;
import com.example.backend.entity.ReportType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
  int id;
  int quizSetId;
  int userId;
  ReportType reportType;
  String description;
  ReportStatus status;
  Date createdDate;

}
