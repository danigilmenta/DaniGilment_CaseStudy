package com.hexaware.springpayrollmanagement.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.springpayrollmanagement.dto.PayrollPolicyDTO;
import com.hexaware.springpayrollmanagement.service.IPayrollPolicyService;

import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/policies")
public class PayrollPolicyController {

    @Autowired
    private IPayrollPolicyService service;

    @PostMapping("/add")
    public PayrollPolicyDTO addPolicy(@Valid @RequestBody PayrollPolicyDTO dto){
        return service.addPolicy(dto);
    }

    @PutMapping("/update")
    public PayrollPolicyDTO updatePolicy(@RequestBody PayrollPolicyDTO dto){
        return service.updatePolicy(dto);
    }

    @GetMapping("/{id}")
    public PayrollPolicyDTO getPolicyById(@PathVariable int id){
        return service.getPolicyById(id);
    }

    @GetMapping("/all")
    public List<PayrollPolicyDTO> getAllPolicies(){
        return service.getAllPolicies();
    }

    @DeleteMapping("/delete/{id}")
    public String deletePolicy(@PathVariable int id){

        service.deletePolicy(id);

        return "Policy Deleted Successfully";
    }
}