package com.hexaware.springpayrollmanagement.dto;

public class ResetPasswordRequest {
    private String username;
    private String newPassword;

    public ResetPasswordRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
