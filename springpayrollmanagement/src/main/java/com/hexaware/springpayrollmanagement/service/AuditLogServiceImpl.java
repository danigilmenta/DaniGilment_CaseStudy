package com.hexaware.springpayrollmanagement.service;

import com.hexaware.springpayrollmanagement.entity.AuditLog;
import com.hexaware.springpayrollmanagement.repo.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public void logAction(String username, String action, String details) {
        AuditLog log = new AuditLog(username, action, details, LocalDateTime.now());
        auditLogRepository.save(log);
    }

    @Override
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAllByOrderByTimestampDesc();
    }

    @Override
    public List<AuditLog> searchLogs(String query) {

        List<AuditLog> byUsername = auditLogRepository.findByUsernameContainingIgnoreCase(query);
        List<AuditLog> byAction = auditLogRepository.findByActionContainingIgnoreCase(query);

        for (AuditLog actionLog : byAction) {
            if (byUsername.stream().noneMatch(log -> log.getId().equals(actionLog.getId()))) {
                byUsername.add(actionLog);
            }
        }

        byUsername.sort((l1, l2) -> l2.getTimestamp().compareTo(l1.getTimestamp()));
        return byUsername;
    }
}
