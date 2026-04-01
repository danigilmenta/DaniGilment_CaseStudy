
package com.hexaware.springpayrollmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayrollPolicyDTO {
    private Integer policyId;

    @Min(value = 1, message = "HRA percent must be greater than 0")
    private double hraPercent;

    @Min(value = 1, message = "Tax percent must be greater than 0")
    private double taxPercent;

    @Min(value = 1, message = "PF percent must be greater than 0")
    private double pfPercent;
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
