
package com.hexaware.springpayrollmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.springpayrollmanagement.dto.PayrollDTO;

@SpringBootTest
class PayrollServiceImplTest {

    private static final Logger log = LogManager.getLogger(PayrollServiceImplTest.class);

    @Autowired
    IPayrollService service;



    @Test
    void testGeneratePayroll() {

        PayrollDTO p = service.generatePayroll(102, 1, 3, 2026);

        log.info("Payroll Generated");

        assertEquals(3, p.getMonth());
    }
}
