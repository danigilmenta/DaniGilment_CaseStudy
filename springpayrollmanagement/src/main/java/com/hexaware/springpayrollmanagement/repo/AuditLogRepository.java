package com.hexaware.springpayrollmanagement.repo;

import com.hexaware.springpayrollmanagement.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findAllByOrderByTimestampDesc();
    List<AuditLog> findByUsernameContainingIgnoreCase(String username);
    List<AuditLog> findByActionContainingIgnoreCase(String action);
}
