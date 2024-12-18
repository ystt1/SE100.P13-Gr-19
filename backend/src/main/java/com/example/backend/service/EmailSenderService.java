package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

  private final JavaMailSenderImpl mailSender;

  @Autowired
  public EmailSenderService(JavaMailSenderImpl mailSender) {
    this.mailSender = mailSender;
  }

  public void sendEmail(String targetEmail, String subject, String body) {
    // send email
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setFrom("f8lmoon9@gmail.com");
    msg.setTo(targetEmail);
    msg.setSubject(subject);
    msg.setText(body);

    mailSender.send(msg);

    System.out.println("Email sent successfully");
  }

}
