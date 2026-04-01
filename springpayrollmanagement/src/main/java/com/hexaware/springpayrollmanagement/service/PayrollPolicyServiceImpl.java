package com.hexaware.springpayrollmanagement.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.springpayrollmanagement.dto.PayrollPolicyDTO;
import com.hexaware.springpayrollmanagement.entity.PayrollPolicy;
import com.hexaware.springpayrollmanagement.repo.PayrollPolicyRepo;

@Service
public class PayrollPolicyServiceImpl implements IPayrollPolicyService {

    @Autowired
    private PayrollPolicyRepo repo;

    public static PayrollPolicyDTO mapEntity2Dto(PayrollPolicy policy){

        if(policy == null) return null;

        PayrollPolicyDTO dto = new PayrollPolicyDTO();

        dto.setPolicyId(policy.getPolicyId());
        dto.setHraPercent(policy.getHraPercent());
        dto.setTaxPercent(policy.getTaxPercent());
        dto.setPfPercent(policy.getPfPercent());

        return dto;
    }

    @Override
    public PayrollPolicyDTO addPolicy(PayrollPolicyDTO dto){

        PayrollPolicy policy = new PayrollPolicy();

        policy.setHraPercent(dto.getHraPercent());
        policy.setTaxPercent(dto.getTaxPercent());
        policy.setPfPercent(dto.getPfPercent());

        return mapEntity2Dto(repo.save(policy));
    }

    @Override
    public PayrollPolicyDTO updatePolicy(PayrollPolicyDTO dto){

        PayrollPolicy policy = repo.findById(dto.getPolicyId()).orElse(null);

        policy.setHraPercent(dto.getHraPercent());
        policy.setTaxPercent(dto.getTaxPercent());
        policy.setPfPercent(dto.getPfPercent());

        return mapEntity2Dto(repo.save(policy));
    }

    @Override
    public PayrollPolicyDTO getPolicyById(int policyId){

        return mapEntity2Dto(repo.findById(policyId).orElse(null));
    }

    @Override
    public List<PayrollPolicyDTO> getAllPolicies(){

        List<PayrollPolicyDTO> list = new ArrayList<>();

        for(PayrollPolicy policy : repo.findAll()){

            list.add(mapEntity2Dto(policy));
        }

        return list;
    }

    @Override
    public void deletePolicy(int policyId){

        repo.deleteById(policyId);
    }
}