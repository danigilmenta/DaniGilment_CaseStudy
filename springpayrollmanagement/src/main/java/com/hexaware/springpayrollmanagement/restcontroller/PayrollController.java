package com.hexaware.springpayrollmanagement.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.springpayrollmanagement.dto.PayrollDTO;
import com.hexaware.springpayrollmanagement.service.IPayrollService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private IPayrollService service;

    @PostMapping("/generate")
    public PayrollDTO generatePayroll(
            @RequestParam int empId,
            @RequestParam int policyId,
            @RequestParam int month,
            @RequestParam int year){

        return service.generatePayroll(empId, policyId, month, year);
    }

    @GetMapping("/{id}")
    public PayrollDTO getPayrollById(@PathVariable int id){
        return service.getPayrollById(id);
    }

    @PutMapping("/verify/{id}")
    public PayrollDTO verifyPayroll(@PathVariable int id) {
        return service.verifyPayroll(id);
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