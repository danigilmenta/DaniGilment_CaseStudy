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


    public static EmployeeDTO mapEntity2Dto(Employee emp){

        if(emp == null) return null;

        EmployeeDTO dto = new EmployeeDTO();
   
        dto.setEmpId(emp.getEmpId());
        dto.setName(emp.getName());
        dto.setBasicSalary(emp.getBasicSalary());
        dto.setContactNumber(emp.getContactNumber());
        dto.setEmailId(emp.getEmailId());

        if(emp.getDepartmentName()!=null)
            dto.setDepartmentName(emp.getDepartmentName());

        return dto;
    }

    @Override
    public EmployeeDTO addEmployee(EmployeeDTO dto){

        Employee emp = new Employee();

      
        emp.setName(dto.getName());
        emp.setBasicSalary(dto.getBasicSalary());
        emp.setContactNumber(dto.getContactNumber());
        emp.setEmailId(dto.getEmailId());

        emp.setDepartmentName(dto.getDepartmentName());

        Employee saved = repo.save(emp);

        return mapEntity2Dto(saved);
    }

    @Override
    public EmployeeDTO updateEmployee(EmployeeDTO dto){

        Employee emp = repo.findById(dto.getEmpId()).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " ));
        
        emp.setName(dto.getName());
        emp.setBasicSalary(dto.getBasicSalary());
        emp.setContactNumber(dto.getContactNumber());
        emp.setEmailId(dto.getEmailId());

        emp.setDepartmentName(dto.getDepartmentName());

        return mapEntity2Dto(repo.save(emp));
    }

    @Override
    public EmployeeDTO getEmployeeById(int empId){
    	  Employee emp = repo.findById(empId)
    	            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + empId));

    	    return mapEntity2Dto(emp);
    }

    @Override
    public EmployeeDTO getEmployeeByEmailId(String emailId) {
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
    }
}