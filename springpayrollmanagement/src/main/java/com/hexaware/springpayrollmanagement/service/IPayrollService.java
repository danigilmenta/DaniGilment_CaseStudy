
package com.hexaware.springpayrollmanagement.service;

import java.util.List;
import com.hexaware.springpayrollmanagement.dto.PayrollDTO;

public interface IPayrollService {

    PayrollDTO generatePayroll(int empId,int policyId,int month,int year);
    PayrollDTO getPayrollById(int payrollId);
    List<PayrollDTO> getPayrollByEmployee(int empId);
    void deletePayroll(int payrollId);
    PayrollDTO verifyPayroll(int payrollId);
}
