package com.hexaware.springpayrollmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.springpayrollmanagement.dto.PayrollDTO;
import com.hexaware.springpayrollmanagement.entity.Employee;
import com.hexaware.springpayrollmanagement.entity.Payroll;
import com.hexaware.springpayrollmanagement.entity.PayrollPolicy;
import com.hexaware.springpayrollmanagement.repo.EmployeeRepo;
import com.hexaware.springpayrollmanagement.repo.PayrollPolicyRepo;
import com.hexaware.springpayrollmanagement.repo.PayrollRepo;

@Service
public class PayrollServiceImpl implements IPayrollService {

    @Autowired
    private PayrollRepo payrollRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PayrollPolicyRepo policyRepo;

    public static PayrollDTO mapEntity2Dto(Payroll payroll){

        if(payroll == null) return null;

        PayrollDTO dto = new PayrollDTO();

        dto.setPayrollId(payroll.getPayrollId());
        dto.setMonth(payroll.getMonth());
        dto.setYear(payroll.getYear());
        dto.setBasicSalary(payroll.getBasicSalary());
        dto.setHra(payroll.getHra());
        dto.setTax(payroll.getTax());
        dto.setPf(payroll.getPf());
        dto.setNetSalary(payroll.getNetSalary());
        dto.setStatus(payroll.getStatus());

        if(payroll.getEmployee()!=null)
            dto.setEmpId(payroll.getEmployee().getEmpId());

        return dto;
    }

    @Override
    public PayrollDTO generatePayroll(int empId,int policyId,int month,int year){

        Employee emp = employeeRepo.findById(empId).orElse(null);

        PayrollPolicy policy = policyRepo.findById(policyId).orElse(null);

        double basic = emp.getBasicSalary();

        double hra = basic * policy.getHraPercent() / 100;
        double tax = basic * policy.getTaxPercent() / 100;
        double pf = basic * policy.getPfPercent() / 100;

        double netSalary = basic + hra - tax - pf;

        Payroll payroll = new Payroll();

        payroll.setEmployee(emp);
        payroll.setMonth(month);
        payroll.setYear(year);
        payroll.setBasicSalary(basic);
        payroll.setHra(hra);
        payroll.setTax(tax);
        payroll.setPf(pf);
        payroll.setNetSalary(netSalary);
        payroll.setStatus("PENDING");

        return mapEntity2Dto(payrollRepo.save(payroll));
    }

    @Override
    public PayrollDTO verifyPayroll(int payrollId){
        Payroll payroll = payrollRepo.findById(payrollId).orElse(null);
        if(payroll != null) {
            payroll.setStatus("VERIFIED");
            payrollRepo.save(payroll);
        }
        return mapEntity2Dto(payroll);
    }

    @Override
    public PayrollDTO getPayrollById(int payrollId){

        return mapEntity2Dto(payrollRepo.findById(payrollId).orElse(null));
    }

    @Override
    public List<PayrollDTO> getPayrollByEmployee(int empId){

        List<PayrollDTO> list = new ArrayList<>();

        for(Payroll payroll : payrollRepo.findByEmployeeEmpId(empId)){

            list.add(mapEntity2Dto(payroll));
        }

        return list;
    }

    @Override
    public void deletePayroll(int payrollId){

        payrollRepo.deleteById(payrollId);
    }
}