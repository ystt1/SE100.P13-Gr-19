package com.example.backend.advice;

import com.example.backend.DTO.ErrorDTO;
import com.example.backend.exception.ConflictException;
import com.example.backend.exception.ForbiddenException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.exception.ValidationException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ErrorDTO> handleResourceNotFoundException(ResourceNotFoundException e) {
    return ResponseEntity.status(404).body(new ErrorDTO(e.getMessage(), LocalDateTime.now()));
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ErrorDTO> handleValidationException(ValidationException e) {
    return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage(), LocalDateTime.now()));
  }

  @ExceptionHandler(ConflictException.class)
  public ResponseEntity<ErrorDTO> handleConflictException(ConflictException e) {
    return ResponseEntity.status(409).body(new ErrorDTO(e.getMessage(), LocalDateTime.now()));
  }

  @ExceptionHandler(ForbiddenException.class)
  public ResponseEntity<ErrorDTO> handleForbiddenException(ForbiddenException e) {
    return ResponseEntity.status(403).body(new ErrorDTO(e.getMessage(), LocalDateTime.now()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleException(Exception e) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
  }
}
