package com.hexaware.springpayrollmanagement.restcontroller;

import com.hexaware.springpayrollmanagement.dto.DashboardMetricsDTO;
import com.hexaware.springpayrollmanagement.repo.EmployeeRepo;
import com.hexaware.springpayrollmanagement.repo.LeaveRequestRepo;
import com.hexaware.springpayrollmanagement.repo.PayrollRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PayrollRepo payrollRepo;

    @Autowired
    private LeaveRequestRepo leaveRequestRepo;

    @GetMapping("/admin")
    public DashboardMetricsDTO getAdminDashboard() {
        DashboardMetricsDTO dto = new DashboardMetricsDTO();
        
        List<Object[]> rawCounts = employeeRepo.countEmployeesByDepartment();
        Map<String, Long> mappedCounts = new HashMap<>();
        for (Object[] row : rawCounts) {
            String dept = row[0] != null ? (String) row[0] : "Unassigned";
            Long count = (Long) row[1];
            mappedCounts.put(dept, count);
        }
        dto.setDepartmentEmployeeCount(mappedCounts);

        Double avg = employeeRepo.getAverageSalary();
        dto.setAverageSalary(avg != null ? avg : 0.0);

        Double totalPayroll = payrollRepo.totalVerifiedPayrollAmount();
        dto.setTotalMonthlyPayrollCost(totalPayroll != null ? totalPayroll : 0.0);

        return dto;
    }

    @GetMapping("/employee/{empId}")
    public DashboardMetricsDTO getEmployeeDashboard(@PathVariable int empId) {
        DashboardMetricsDTO dto = new DashboardMetricsDTO();

        Double netPay = payrollRepo.totalNetSalaryByEmployee(empId);
        Double grossPay = payrollRepo.totalGrossSalaryByEmployee(empId);
        dto.setNetPay(netPay != null ? netPay : 0.0);
        dto.setGrossPay(grossPay != null ? grossPay : 0.0);

        Long pendingLeaves = leaveRequestRepo.countPendingLeavesByEmployee(empId);
        Long approvedLeaves = leaveRequestRepo.countApprovedLeavesByEmployee(empId);

        dto.setPendingLeaveRequests(pendingLeaves != null ? pendingLeaves : 0L);
        dto.setYearlyLeavesTaken(approvedLeaves != null ? approvedLeaves : 0L);
        dto.setMonthlyLeavesTaken(approvedLeaves != null ? approvedLeaves : 0L);
        dto.setLeaveBalance(30.0 - (approvedLeaves != null ? approvedLeaves : 0L));

        return dto;
    }

    @GetMapping("/manager")
    public DashboardMetricsDTO getManagerDashboard() {
        DashboardMetricsDTO dto = new DashboardMetricsDTO();
        
        Long pending = leaveRequestRepo.countAllPendingLeaves();
        Long approved = leaveRequestRepo.countAllApprovedLeaves();
        Long rejected = leaveRequestRepo.countAllRejectedLeaves();

        dto.setPendingLeaveApprovals(pending != null ? pending : 0L);
        dto.setApprovedLeaves(approved != null ? approved : 0L);
        dto.setRejectedLeaves(rejected != null ? rejected : 0L);

        return dto;
    }

    @GetMapping("/processor")
    public DashboardMetricsDTO getProcessorDashboard() {
        DashboardMetricsDTO dto = new DashboardMetricsDTO();

        Double totalAmount = payrollRepo.totalVerifiedPayrollAmount();
        Long pendingPayrolls = payrollRepo.countPendingPayrolls();
        Long verifiedPayrolls = payrollRepo.countVerifiedPayrolls();

        dto.setTotalAmountProcessed(totalAmount != null ? totalAmount : 0.0);
        dto.setPendingPayrollApprovals(pendingPayrolls != null ? pendingPayrolls : 0L);
        dto.setVerifiedPayrolls(verifiedPayrolls != null ? verifiedPayrolls : 0L);

        return dto;
    }
}
