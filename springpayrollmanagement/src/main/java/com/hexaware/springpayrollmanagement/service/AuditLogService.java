package com.hexaware.springpayrollmanagement.service;

import com.hexaware.springpayrollmanagement.entity.AuditLog;
import java.util.List;

public interface AuditLogService {
    void logAction(String username, String action, String details);
    List<AuditLog> getAllLogs();
    List<AuditLog> searchLogs(String query);
}
