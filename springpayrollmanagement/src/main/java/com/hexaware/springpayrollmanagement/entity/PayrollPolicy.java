package com.hexaware.springpayrollmanagement.entity;


import jakarta.persistence.*;

@Entity
@Table(name="payroll_policy")
public class PayrollPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int policyId;

    private double hraPercent;
    private double taxPercent;
    private double pfPercent;

    public PayrollPolicy(){}

    public PayrollPolicy(int policyId,double hraPercent,double taxPercent,double pfPercent){
        this.policyId=policyId;
        this.hraPercent=hraPercent;
        this.taxPercent=taxPercent;
        this.pfPercent=pfPercent;
    }

	public int getPolicyId() {
		return policyId;
	}

	public void setPolicyId(int policyId) {
		this.policyId = policyId;
	}

	public double getHraPercent() {
		return hraPercent;
	}

	public void setHraPercent(double hraPercent) {
		this.hraPercent = hraPercent;
	}

	public double getTaxPercent() {
		return taxPercent;
	}

	public void setTaxPercent(double taxPercent) {
		this.taxPercent = taxPercent;
	}

	public double getPfPercent() {
		return pfPercent;
	}

	public void setPfPercent(double pfPercent) {
		this.pfPercent = pfPercent;
	}

   
}