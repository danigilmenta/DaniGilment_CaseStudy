
package com.hexaware.springpayrollmanagement.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
	
	    private int empId;

	    @NotBlank(message = "Employee name cannot be empty")
	    private String name;

	    @NotNull(message = "Salary cannot be null")
	    
	    private Double basicSalary;

	    @NotBlank(message = "Department name cannot be empty")
	    private String departmentName;

		@NotBlank(message = "Contact number cannot be empty")
	    private String contactNumber;

	    @Email(message = "Invalid email format")
	    @NotBlank(message = "Email cannot be empty")
	    private String emailId;

    public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public Double getBasicSalary() {
		return basicSalary;
	}
	public void setBasicSalary(double i) {
		this.basicSalary = i;
	}
	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId=empId;
		
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

}
