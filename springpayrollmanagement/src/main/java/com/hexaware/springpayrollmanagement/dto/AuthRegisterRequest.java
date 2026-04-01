package com.hexaware.springpayrollmanagement.dto;

public class AuthRegisterRequest {
    private String username;
    private String emailId;
    private String password;
    private String role;

    public AuthRegisterRequest() {
    }

    public AuthRegisterRequest(String username, String emailId, String password, String role) {
        this.username = username;
        this.emailId = emailId;
        this.password = password;
        this.role = role;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
