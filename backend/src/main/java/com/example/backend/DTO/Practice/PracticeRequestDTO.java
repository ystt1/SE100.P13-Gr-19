package com.example.backend.DTO.Practice;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PracticeRequestDTO {

  private Integer teamId;

  private Integer time;

  private List<Answer> listAnswer;

}
