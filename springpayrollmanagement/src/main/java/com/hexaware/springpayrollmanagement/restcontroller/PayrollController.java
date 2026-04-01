package com.hexaware.springpayrollmanagement.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.springpayrollmanagement.dto.PayrollDTO;
import com.hexaware.springpayrollmanagement.service.IPayrollService;
import com.hexaware.springpayrollmanagement.service.AuditLogService;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private IPayrollService service;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping("/generate")
    public PayrollDTO generatePayroll(
            @RequestParam int empId,
            @RequestParam int policyId,
            @RequestParam int month,
            @RequestParam int year){

        PayrollDTO dto = service.generatePayroll(empId, policyId, month, year);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        auditLogService.logAction(username, "Generated Payroll", "Generated payroll for employee ID " + empId + " for month " + month + " year " + year);
        return dto;
    }

    @GetMapping("/{id}")
    public PayrollDTO getPayrollById(@PathVariable int id){
        return service.getPayrollById(id);
    }

    @PutMapping("/verify/{id}")
    public PayrollDTO verifyPayroll(@PathVariable int id){
        PayrollDTO dto = service.verifyPayroll(id);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        auditLogService.logAction(username, "Verified Payroll", "Verified payroll ID " + id);
        return dto;
    }

    @GetMapping("/employee/{empId}")
    public List<PayrollDTO> getPayrollByEmployee(@PathVariable int empId){
        return service.getPayrollByEmployee(empId);
    }

    @DeleteMapping("/delete/{id}")
    public String deletePayroll(@PathVariable int id){

        service.deletePayroll(id);

        return "Payroll Deleted Successfully";
    }
}