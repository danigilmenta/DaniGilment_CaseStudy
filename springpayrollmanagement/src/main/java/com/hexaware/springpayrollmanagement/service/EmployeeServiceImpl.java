package com.hexaware.springpayrollmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.springpayrollmanagement.dto.EmployeeDTO;
import com.hexaware.springpayrollmanagement.entity.Employee;
import com.hexaware.springpayrollmanagement.exception.ResourceNotFoundException;
import com.hexaware.springpayrollmanagement.repo.EmployeeRepo;

@Service
public class EmployeeServiceImpl implements IEmployeeService {

    @Autowired
    private EmployeeRepo repo;

    @Autowired
    private com.hexaware.springpayrollmanagement.service.AuditLogService auditLogService;

    private String getCurrentUsername() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            return auth.getName();
        }
        return "System";
    }

    public static EmployeeDTO mapEntity2Dto(Employee emp){

        if(emp == null) return null;

        EmployeeDTO dto = new EmployeeDTO();
   
        dto.setEmpId(emp.getEmpId());
        dto.setName(emp.getName());
        dto.setBasicSalary(emp.getBasicSalary());

        if(emp.getDepartmentName()!=null)
            dto.setDepartmentName(emp.getDepartmentName());

        dto.setContactNumber(emp.getContactNumber());
        dto.setEmailId(emp.getEmailId());

        return dto;
    }

    @Override
    public EmployeeDTO addEmployee(EmployeeDTO dto){

        Employee emp = new Employee();

      
        emp.setName(dto.getName());
        emp.setBasicSalary(dto.getBasicSalary());

        emp.setDepartmentName(dto.getDepartmentName());
        emp.setContactNumber(dto.getContactNumber());
        emp.setEmailId(dto.getEmailId());

        Employee saved = repo.save(emp);
        auditLogService.logAction(getCurrentUsername(), "ADD_EMPLOYEE", "Added new employee: " + saved.getName());
        return mapEntity2Dto(saved);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO dto){

        Employee emp = repo.findById(dto.getEmpId()).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " ));
        
        emp.setName(dto.getName());
        emp.setBasicSalary(dto.getBasicSalary());

        emp.setDepartmentName(dto.getDepartmentName());
        emp.setContactNumber(dto.getContactNumber());
        emp.setEmailId(dto.getEmailId());

        Employee saved = repo.save(emp);
        auditLogService.logAction(getCurrentUsername(), "UPDATE_EMPLOYEE", "Updated details for employee: " + saved.getName());
        return mapEntity2Dto(saved);
    }

    @Override
    public EmployeeDTO getEmployeeById(int empId){
    	  Employee emp = repo.findById(empId)
    	            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + empId));

    	    return mapEntity2Dto(emp);
    }

    @Override
    public EmployeeDTO getEmployeeByEmail(String emailId) {
        Employee emp = repo.findByEmailId(emailId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with email: " + emailId));
        return mapEntity2Dto(emp);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees(){

        List<EmployeeDTO> dtoList = new ArrayList<>();

        for(Employee emp : repo.findAll()){

            dtoList.add(mapEntity2Dto(emp));
        }

        return dtoList;
    }

    @Override
    public void deleteEmployee(int empId){

        repo.deleteById(empId);
        auditLogService.logAction(getCurrentUsername(), "DELETE_EMPLOYEE", "Deleted employee ID: " + empId);
    }
}