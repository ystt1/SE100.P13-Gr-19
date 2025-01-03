package com.example.backend.DTO.Practice;

import lombok.Data;

@Data
public class OptionResultDTO{
  private Integer id;
  private String content;
  private Boolean isCorrect;
  private Boolean isSelected;
}
