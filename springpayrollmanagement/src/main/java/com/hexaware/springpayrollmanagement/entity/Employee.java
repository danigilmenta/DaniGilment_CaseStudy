package com.hexaware.springpayrollmanagement.entity;


import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int empId;

    private String name;

    private Double basicSalary;

    private String departmentName;

    @Column(name="contact_number")
    private String contactNumber;

    @Column(name="email_id", unique=true)
    private String emailId;

    @OneToMany(mappedBy="employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payroll> payrolls;

    @OneToMany(mappedBy="employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LeaveRequest> leaves;

    public Employee() {
    }
    

    public Employee(int empId,String name,Double basicSalary,String departmentName, String contactNumber, String emailId){
        this.empId=empId;
        this.name=name;
        this.basicSalary=basicSalary;
        this.departmentName=departmentName;
        this.contactNumber=contactNumber;
        this.emailId=emailId;
    }
	public int getEmpId() {
		return empId;
	}

	public void setEmpId(int empId) {
		this.empId = empId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(Double basicSalary) {
		this.basicSalary = basicSalary;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public List<Payroll> getPayrolls() {
		return payrolls;
	}

	public void setPayrolls(List<Payroll> payrolls) {
		this.payrolls = payrolls;
	}

	public List<LeaveRequest> getLeaves() {
		return leaves;
	}

	public void setLeaves(List<LeaveRequest> leaves) {
		this.leaves = leaves;
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