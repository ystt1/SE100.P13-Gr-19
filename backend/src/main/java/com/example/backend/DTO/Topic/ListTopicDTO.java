package com.example.backend.DTO.Topic;

import java.util.List;
import lombok.Data;

@Data
public class ListTopicDTO {
  private List<TopicDTO> topics;
}
