package com.example.backend.controller;

import com.example.backend.DTO.Auth.AuthenticationRequest;
import com.example.backend.DTO.Auth.AuthenticationResponse;
import com.example.backend.service.AuthenticationService;
import com.example.backend.DTO.Auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticateController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest registerRequest) {
    return ResponseEntity.ok(service.register(registerRequest));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
    return ResponseEntity.ok(service.authenticate(authenticationRequest));
  }

  @GetMapping("/activate/{token}")
  public String ActivateEmail(@PathVariable String token) {
    return service.activateEmail(token);
  }
}
