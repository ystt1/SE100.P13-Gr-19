package com.example.backend.DTO.Topic;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListTopicResponseDTO {

  private Integer totalElements;

  private Integer totalPages;

  private Integer currentPage;

  private List<TopicResponseDTO> topics;
}
