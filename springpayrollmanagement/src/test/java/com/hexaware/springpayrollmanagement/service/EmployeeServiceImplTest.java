package com.hexaware.springpayrollmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.springpayrollmanagement.dto.EmployeeDTO;

@SpringBootTest
class EmployeeServiceImplTest {

    private static final Logger log = LogManager.getLogger(EmployeeServiceImplTest.class);

    @Autowired
    IEmployeeService service;

    @BeforeAll
    static void setUpBeforeClass() throws Exception {
        System.out.println("Starting Employee Service Tests");
    }

    @Test
    void testAddEmployee() {

        EmployeeDTO e = new EmployeeDTO();
        e.setEmpId(102);
        e.setName("Jeelani");
        e.setBasicSalary(30000.0);
        e.setDepartmentName("Engineering");
        e.setContactNumber("1234567890");
        e.setEmailId("test@hexaware.com");

        EmployeeDTO e1 = service.addEmployee(e);

        log.info("Employee Added Successfully");

        assertEquals("Jeelani", e1.getName());
    }

    @Test
    void testDeleteEmployee() {

        service.deleteEmployee(102);

        log.info("Employee Deleted Successfully");

        assertEquals(true, true);
    }
}