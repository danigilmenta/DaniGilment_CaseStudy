
package com.hexaware.springpayrollmanagement.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.springpayrollmanagement.entity.PayrollPolicy;

public interface PayrollPolicyRepo extends JpaRepository<PayrollPolicy,Integer>{

}