
package com.hexaware.springpayrollmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hexaware.springpayrollmanagement.entity.Payroll;
import java.util.List;

public interface PayrollRepo extends JpaRepository<Payroll, Integer> {

    List<Payroll> findByEmployeeEmpId(int empId);

    @Query("SELECT SUM(p.netSalary) FROM Payroll p WHERE p.status = 'VERIFIED'")
    Double totalVerifiedPayrollAmount();

    @Query("SELECT SUM(p.netSalary) FROM Payroll p WHERE p.employee.empId = ?1")
    Double totalNetSalaryByEmployee(int empId);

    @Query("SELECT SUM(p.basicSalary + p.hra) FROM Payroll p WHERE p.employee.empId = ?1")
    Double totalGrossSalaryByEmployee(int empId);

    @Query("SELECT COUNT(p) FROM Payroll p WHERE p.status = 'PENDING'")
    Long countPendingPayrolls();

    @Query("SELECT COUNT(p) FROM Payroll p WHERE p.status = 'VERIFIED'")
    Long countVerifiedPayrolls();
}