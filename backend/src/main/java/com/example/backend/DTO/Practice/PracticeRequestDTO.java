package com.example.backend.DTO.Practice;

import java.util.List;
import lombok.Data;

@Data
public class PracticeRequestDTO {

  private Integer time;

  private List<Answer> listAnswer;

}
