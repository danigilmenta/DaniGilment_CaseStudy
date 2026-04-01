
package com.hexaware.springpayrollmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.springpayrollmanagement.dto.PayrollPolicyDTO;

@SpringBootTest
class PayrollPolicyServiceImplTest {

    private static final Logger log = LogManager.getLogger(PayrollPolicyServiceImplTest.class);

    @Autowired
    IPayrollPolicyService service;

    @BeforeAll
    static void setUpBeforeClass() throws Exception {
        System.out.println("Starting Payroll Policy Tests");
    }

    @Test
    void testAddPolicy() {

        PayrollPolicyDTO policy = new PayrollPolicyDTO();

        policy.setPolicyId(1);
        policy.setHraPercent(20);
        policy.setTaxPercent(10);
        policy.setPfPercent(12);

        PayrollPolicyDTO p1 = service.addPolicy(policy);

        log.info("Payroll Policy Added");

        assertEquals(20, p1.getHraPercent());
    }
}
