package com.hexaware.springpayrollmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.springpayrollmanagement.dto.PayrollDTO;
import com.hexaware.springpayrollmanagement.entity.Employee;
import com.hexaware.springpayrollmanagement.entity.PayrollPolicy;
import com.hexaware.springpayrollmanagement.repo.EmployeeRepo;
import com.hexaware.springpayrollmanagement.repo.PayrollPolicyRepo;

@SpringBootTest
class PayrollServiceImplTest {

    private static final Logger log = LogManager.getLogger(PayrollServiceImplTest.class);

    @Autowired
    IPayrollService service;

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private PayrollPolicyRepo policyRepo;

    @Test
    @Transactional
    void testGeneratePayroll() {
        Employee emp = new Employee();
        emp.setName("Jeelani");
        emp.setBasicSalary(50000.0);
        emp.setDepartmentName("Engineering");
        Employee savedEmp = employeeRepo.save(emp);

        PayrollPolicy policy = new PayrollPolicy();
        policy.setHraPercent(10);
        policy.setTaxPercent(10);
        policy.setPfPercent(10);
        PayrollPolicy savedPolicy = policyRepo.save(policy);

        PayrollDTO p = service.generatePayroll(savedEmp.getEmpId(), savedPolicy.getPolicyId(), 3, 2026);

        log.info("Payroll Generated");

        assertEquals(3, p.getMonth());
        assertEquals(45000.0, p.getNetSalary(), 0.01);
    }
}
