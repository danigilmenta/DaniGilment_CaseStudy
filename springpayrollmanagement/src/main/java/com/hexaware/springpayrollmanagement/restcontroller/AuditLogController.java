package com.hexaware.springpayrollmanagement.restcontroller;

import com.hexaware.springpayrollmanagement.entity.AuditLog;
import com.hexaware.springpayrollmanagement.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public ResponseEntity<List<AuditLog>> getAllLogs() {
        return ResponseEntity.ok(auditLogService.getAllLogs());
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuditLog>> searchLogs(@RequestParam String query) {
        return ResponseEntity.ok(auditLogService.searchLogs(query));
    }
}
