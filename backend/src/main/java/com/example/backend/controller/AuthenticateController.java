package com.example.backend.controller;

import com.example.backend.authenticate.AuthenticationRequest;
import com.example.backend.authenticate.AuthenticationResponse;
import com.example.backend.authenticate.AuthenticationService;
import com.example.backend.authenticate.RegisterRequest;
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
    try {
      service.register(registerRequest);
      return ResponseEntity.ok(AuthenticationResponse.builder().message("User registered successfully, check your email to activate your account").build());
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(AuthenticationResponse.builder().message(e.getMessage()).build());
    }
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
