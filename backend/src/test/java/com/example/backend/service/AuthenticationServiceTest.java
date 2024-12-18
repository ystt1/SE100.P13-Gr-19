// AuthenticationServiceTest.java
package com.example.backend.service;

import com.example.backend.DTO.Auth.AuthenticationRequest;
import com.example.backend.DTO.Auth.AuthenticationResponse;
import com.example.backend.DTO.Auth.RegisterRequest;
import com.example.backend.entity.User;
import com.example.backend.exception.ValidationException;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

public class AuthenticationServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private JwtService jwtService;

  @Mock
  private EmailSenderService emailSenderService;

  @Mock
  private AuthenticationManager authenticationManager;

  @InjectMocks
  private AuthenticationService authenticationService;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  // AuthenticationServiceTest.java
  @Test
  public void testRegister_ValidCase() {
    RegisterRequest registerRequest = new RegisterRequest();
    registerRequest.setEmail("test@example.com");
    registerRequest.setPassword("password123");
    registerRequest.setName("Test User");

    User user = new User();
    user.setEmail("test@example.com");
    user.setPassword("encodedPassword");
    user.setName("Test User");

    when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());
    when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
    when(userRepository.save(any(User.class))).thenReturn(user);
    when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

    AuthenticationResponse response = authenticationService.register(registerRequest);

    assertEquals("jwtToken", response.getToken());
  }

  @Test
  public void testRegister_InvalidEmail() {
    RegisterRequest registerRequest = new RegisterRequest();
    registerRequest.setEmail("invalidEmail");
    registerRequest.setPassword("password123");
    registerRequest.setName("Test User");

    ValidationException exception = assertThrows(ValidationException.class, () -> {
      authenticationService.register(registerRequest);
    });

    assertEquals("Invalid email format", exception.getMessage());
  }

  @Test
  public void testRegister_InvalidPassword() {
    RegisterRequest registerRequest = new RegisterRequest();
    registerRequest.setEmail("test@example.com");
    registerRequest.setPassword("12345");
    registerRequest.setName("Test User");

    ValidationException exception = assertThrows(ValidationException.class, () -> {
      authenticationService.register(registerRequest);
    });

    assertEquals("Password must be more than 8 characters long and contain both numbers and letters", exception.getMessage());
  }

  @Test
  public void testRegister_EmptyName() {
    RegisterRequest registerRequest = new RegisterRequest();
    registerRequest.setEmail("test@example.com");
    registerRequest.setPassword("password123");
    registerRequest.setName("");

    ValidationException exception = assertThrows(ValidationException.class, () -> {
      authenticationService.register(registerRequest);
    });

    assertEquals("Name cannot be empty", exception.getMessage());
  }

  @Test
  public void testRegister_UserAlreadyExists() {
    RegisterRequest registerRequest = new RegisterRequest();
    registerRequest.setEmail("test@example.com");
    registerRequest.setPassword("password123");
    registerRequest.setName("Test User");

    when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(new User()));

    ValidationException exception = assertThrows(ValidationException.class, () -> {
      authenticationService.register(registerRequest);
    });

    assertEquals("User already exists", exception.getMessage());
  }
  // AuthenticationServiceTest.java
  @Test
  public void testAuthenticate_UserNotFound() {
    AuthenticationRequest authenticationRequest = new AuthenticationRequest();
    authenticationRequest.setEmail("nonexistent@example.com");
    authenticationRequest.setPassword("password123");

    when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());

    RuntimeException exception = assertThrows(RuntimeException.class, () -> {
      authenticationService.authenticate(authenticationRequest);
    });

    assertEquals("User not found", exception.getMessage());
  }

  @Test
  public void testAuthenticate_IncorrectPassword() {
    AuthenticationRequest authenticationRequest = new AuthenticationRequest();
    authenticationRequest.setEmail("test@example.com");
    authenticationRequest.setPassword("wrongPassword");

    User user = new User();
    user.setEmail("test@example.com");
    user.setPassword("encodedPassword");

    when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(user));
    doThrow(new BadCredentialsException("Bad credentials")).when(authenticationManager).authenticate(any(
        UsernamePasswordAuthenticationToken.class));

    BadCredentialsException exception = assertThrows(BadCredentialsException.class, () -> {
      authenticationService.authenticate(authenticationRequest);
    });

    assertEquals("Bad credentials", exception.getMessage());
  }

  @Test
  public void testAuthenticate_ValidCredentials() {
    AuthenticationRequest authenticationRequest = new AuthenticationRequest();
    authenticationRequest.setEmail("test@example.com");
    authenticationRequest.setPassword("password123");

    User user = new User();
    user.setEmail("test@example.com");
    user.setPassword("encodedPassword");

    when(userRepository.findByEmail(any(String.class))).thenReturn(Optional.of(user));
    when(jwtService.generateToken(any(User.class))).thenReturn("jwtToken");

    AuthenticationResponse response = authenticationService.authenticate(authenticationRequest);

    assertEquals("jwtToken", response.getToken());
  }
}