package com.example.backend.authenticate;

import com.example.backend.service.EmailSenderService;
import com.example.backend.service.JwtService;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

  public void register(RegisterRequest request) {

    //check if the user already exists
    if(userRepository.findByEmail(request.getEmail()).isPresent()) {
      throw new RuntimeException("User already exists");
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

    try {
      userRepository.save(user);
    } catch (Exception e) {
      throw new RuntimeException("Failed to save user to the database", e);
    }

    // Generate jwt token for the user
    var jwt = jwtService.generateToken(user);

    // Send email to verify the email
    try {
      emailSenderService.sendEmail(request.getEmail(), "Activate your account",
          "http://localhost:8080/api/auth/activate/" + jwt);
    } catch (Exception e) {
      throw new RuntimeException("Failed to send verification email", e);
    }
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
