package com.hexaware.springpayrollmanagement.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.hexaware.springpayrollmanagement.entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
    Optional<Employee> findByEmailId(String emailId);

    @Query("SELECT e.departmentName, COUNT(e) FROM Employee e GROUP BY e.departmentName")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT AVG(e.basicSalary) FROM Employee e")
    Double getAverageSalary();
}