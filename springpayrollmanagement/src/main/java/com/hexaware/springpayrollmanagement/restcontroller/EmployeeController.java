package com.hexaware.springpayrollmanagement.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.springpayrollmanagement.dto.EmployeeDTO;
import com.hexaware.springpayrollmanagement.service.IEmployeeService;

import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private IEmployeeService service;

    @PostMapping("/add")
    public EmployeeDTO addEmployee(@Valid @RequestBody EmployeeDTO dto){
        return service.addEmployee(dto);
    }

    @PutMapping("/update")
    public EmployeeDTO updateEmployee(@Valid @RequestBody EmployeeDTO dto){
        return service.updateEmployee(dto);
    }

    @GetMapping("/{id}")
    public EmployeeDTO getEmployeeById(@PathVariable int id){
        return service.getEmployeeById(id);
    }

    @GetMapping("/by-email/{emailId}")
    public EmployeeDTO getEmployeeByEmailId(@PathVariable String emailId) {
        return service.getEmployeeByEmailId(emailId);
    }

    @GetMapping("/all")
    public List<EmployeeDTO> getAllEmployees(){
        return service.getAllEmployees();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable int id){

        service.deleteEmployee(id);

        return "Employee Deleted Successfully";
    }
}