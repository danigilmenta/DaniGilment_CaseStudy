package com.hexaware.springpayrollmanagement.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.springpayrollmanagement.dto.AuthRegisterRequest;
import com.hexaware.springpayrollmanagement.dto.AuthRequest;
import com.hexaware.springpayrollmanagement.dto.AuthResponse;
import com.hexaware.springpayrollmanagement.dto.ResetPasswordRequest;
import com.hexaware.springpayrollmanagement.entity.User;
import com.hexaware.springpayrollmanagement.repo.UserRepository;
import com.hexaware.springpayrollmanagement.security.JwtService;
import com.hexaware.springpayrollmanagement.service.AuditLogService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRegisterRequest request) {
        if (userRepository.findByEmailId(request.getEmailId()).isPresent() ||
            userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or Email is already taken!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmailId(request.getEmailId());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);

        auditLogService.logAction(request.getUsername(), "REGISTER", "New user registered with role: " + request.getRole());
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                User user = userRepository.findByEmailId(authRequest.getUsername())
                        .orElseGet(() -> userRepository.findByUsername(authRequest.getUsername()).orElse(null));

                if (user != null) {
                    String token = jwtService.generateToken(user.getUsername());
                    auditLogService.logAction(user.getUsername(), "LOGIN", "User logged in successfully");
                    return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getEmailId(), user.getRole()));
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid User Request");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication Failed: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found!");
        }
        
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        
        auditLogService.logAction(user.getUsername(), "PASSWORD_RESET", "User reset their password");
        return ResponseEntity.ok("Password reset successfully");
    }
}
