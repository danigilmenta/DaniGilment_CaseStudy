
package com.hexaware.springpayrollmanagement.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hexaware.springpayrollmanagement.dto.LeaveRequestDTO;

import java.time.LocalDate;

@SpringBootTest
class LeaveRequestServiceImplTest {

    private static final Logger log = LogManager.getLogger(LeaveRequestServiceImplTest.class);

    @Autowired
    ILeaveRequestService service;

    @BeforeAll
    static void setUpBeforeClass() throws Exception {
        System.out.println("Starting LeaveRequest Tests");
    }

    @Test
    void testApplyLeave() {

        LeaveRequestDTO leave = new LeaveRequestDTO();

        leave.setEmpId(102);
        leave.setLeaveType("SICK");
        leave.setStartDate(LocalDate.now());
        leave.setEndDate(LocalDate.now().plusDays(2));
        leave.setReason("Fever");

        LeaveRequestDTO l1 = service.applyLeave(leave);

        log.info("Leave Applied Successfully");

        assertEquals("PENDING", l1.getStatus());
    }
}
