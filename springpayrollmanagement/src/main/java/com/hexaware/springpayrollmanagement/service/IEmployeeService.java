
package com.hexaware.springpayrollmanagement.service;

import java.util.List;
import com.hexaware.springpayrollmanagement.dto.EmployeeDTO;

public interface IEmployeeService {

    EmployeeDTO addEmployee(EmployeeDTO dto);
    
    EmployeeDTO updateEmployee(EmployeeDTO dto);
    
    EmployeeDTO getEmployeeById(int empId);
    EmployeeDTO getEmployeeByEmailId(String emailId);
    List<EmployeeDTO> getAllEmployees();
    void deleteEmployee(int empId);
}
