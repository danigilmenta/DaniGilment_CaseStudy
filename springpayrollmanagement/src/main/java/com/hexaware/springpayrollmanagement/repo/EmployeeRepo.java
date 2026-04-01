
package com.hexaware.springpayrollmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.springpayrollmanagement.entity.Employee;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

    @Query("SELECT e.departmentName, COUNT(e) FROM Employee e GROUP BY e.departmentName")
    List<Object[]> countEmployeesByDepartment();

    @Query("SELECT AVG(e.basicSalary) FROM Employee e")
    Double getAverageSalary();

    java.util.Optional<Employee> findByEmailId(String emailId);
}