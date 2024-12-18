package com.example.backend.service;

import com.example.backend.DTO.Auth.AuthenticationRequest;
import com.example.backend.DTO.Auth.AuthenticationResponse;
import com.example.backend.DTO.Auth.RegisterRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.ValidationException;
import com.example.backend.repository.UserRepository;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final EmailSenderService emailSenderService;

  public AuthenticationResponse register(RegisterRequest request) {

    // Validate email
    if (!request.getEmail().contains("@")) {
      throw new ValidationException("Invalid email format");
    }
    // Validate password
    if (request.getPassword().length() <= 8 || !request.getPassword().matches(".*\\d.*") || !request.getPassword().matches(".*[a-zA-Z].*")) {
      throw new ValidationException("Password must be more than 8 characters long and contain both numbers and letters");
    }
    // Validate name
    if (request.getName().isEmpty()) {
      throw new ValidationException("Name cannot be empty");
    }
    // Check if the user already exists
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new ValidationException("User already exists");
    }

    //create new user and save it to the database
    var user = User.builder()
      .email(request.getEmail())
      .password(passwordEncoder.encode(request.getPassword()))
      .name(request.getName())
      .isActivated(false)
      .createdAt(new Date(System.currentTimeMillis()))
      .role(Role.USER)
      .build();
    userRepository.save(user);

    //generate jwt token for the user
    var jwt = jwtService.generateToken(user);

    //send email to verify the email
    emailSenderService.sendEmail(request.getEmail(), "Activate your account",
        "http://localhost:8080/api/auth/activate/" + jwt);

    //return the jwt token as an AuthenticationResponse
    return AuthenticationResponse.builder()
        .token(jwt)
            .role(user.getRole().name())
        .build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {

    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
    );

    var user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("User not found"));

    var jwt = jwtService.generateToken(user);

    return AuthenticationResponse.builder()
        .token(jwt)
            .role(user.getRole().name())
        .build();
  }

  public String activateEmail(String token) {
    try{
      var email = jwtService.extractEmail(token);

      if(jwtService.isTokenValid(token, email)) {
        var user = userRepository.findByEmail(email);
        if(user.isEmpty()) {
          return "User not found";
        }
        user.get().setIsActivated(true);
        userRepository.save(user.get());
        return "Email activated successfully";
      } else {
        return "Invalid token";
      }
    } catch (Exception e) {
      return "Invalid token";
    }

  }

}
