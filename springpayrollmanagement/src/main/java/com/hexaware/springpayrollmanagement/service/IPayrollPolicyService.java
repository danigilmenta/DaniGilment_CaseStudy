
package com.hexaware.springpayrollmanagement.service;

import java.util.List;
import com.hexaware.springpayrollmanagement.dto.PayrollPolicyDTO;

public interface IPayrollPolicyService {

    PayrollPolicyDTO addPolicy(PayrollPolicyDTO dto);
    
    PayrollPolicyDTO updatePolicy(PayrollPolicyDTO dto);
    
    PayrollPolicyDTO getPolicyById(int policyId);
    
    List<PayrollPolicyDTO> getAllPolicies();
    void deletePolicy(int policyId);
}
