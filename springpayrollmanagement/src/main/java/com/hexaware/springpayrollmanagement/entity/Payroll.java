package com.hexaware.springpayrollmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payroll")
public class Payroll {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int payrollId;

	@ManyToOne
	@JoinColumn(name = "emp_id")
	private Employee employee;

	private int month;
	private int year;

	private double basicSalary;
	private double hra;
	private double tax;
	private double pf;
	private double netSalary;
	private String status;

	public Payroll() {
	}

	public int getPayrollId() {
		return payrollId;
	}

	public void setPayrollId(int payrollId) {
		this.payrollId = payrollId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public double getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(double basicSalary) {
		this.basicSalary = basicSalary;
	}

	public double getHra() {
		return hra;
	}

	public void setHra(double hra) {
		this.hra = hra;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}

	public double getPf() {
		return pf;
	}

	public void setPf(double pf) {
		this.pf = pf;
	}

	public double getNetSalary() {
		return netSalary;
	}

	public void setNetSalary(double netSalary) {
		this.netSalary = netSalary;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Payroll(int payrollId, Employee employee, int month, int year, double basicSalary, double hra, double tax,
			double pf, double netSalary, String status) {
		super();
		this.payrollId = payrollId;
		this.employee = employee;
		this.month = month;
		this.year = year;
		this.basicSalary = basicSalary;
		this.hra = hra;
		this.tax = tax;
		this.pf = pf;
		this.netSalary = netSalary;
		this.status = status;
	}

}
