package com.hexaware.springpayrollmanagement.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hexaware.springpayrollmanagement.entity.LeaveRequest;

public interface LeaveRequestRepo extends JpaRepository<LeaveRequest,Integer>{

    List<LeaveRequest> findByStatus(String status);

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee.empId = ?1 AND l.status = 'PENDING'")
    Long countPendingLeavesByEmployee(int empId);

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.employee.empId = ?1 AND l.status = 'APPROVED'")
    Long countApprovedLeavesByEmployee(int empId);

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.status = 'PENDING'")
    Long countAllPendingLeaves();

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.status = 'APPROVED'")
    Long countAllApprovedLeaves();

    @Query("SELECT COUNT(l) FROM LeaveRequest l WHERE l.status = 'REJECTED'")
    Long countAllRejectedLeaves();
}