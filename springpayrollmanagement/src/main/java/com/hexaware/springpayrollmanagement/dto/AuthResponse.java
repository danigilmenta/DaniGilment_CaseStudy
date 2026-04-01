package com.hexaware.springpayrollmanagement.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String emailId;
    private String role;

    public AuthResponse() {
    }

    public AuthResponse(String token, String username, String emailId, String role) {
        this.token = token;
        this.username = username;
        this.emailId = emailId;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
