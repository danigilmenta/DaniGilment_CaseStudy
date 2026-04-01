package com.hexaware.springpayrollmanagement.dto;

import java.util.Map;

public class DashboardMetricsDTO {
   
    private Map<String, Long> departmentEmployeeCount;
    private Double totalMonthlyPayrollCost;
    private Double averageSalary;

  
    private Double netPay;
    private Double grossPay;
    private Double leaveBalance;
    private Long monthlyLeavesTaken;
    private Long yearlyLeavesTaken;
    private Long pendingLeaveRequests;

  
    private Long pendingLeaveApprovals;
    private Long approvedLeaves;
    private Long rejectedLeaves;


    private Double totalAmountProcessed;
    private Long pendingPayrollApprovals;
    private Long verifiedPayrolls;

    public DashboardMetricsDTO() {
    }

    public Map<String, Long> getDepartmentEmployeeCount() {
        return departmentEmployeeCount;
    }

    public void setDepartmentEmployeeCount(Map<String, Long> departmentEmployeeCount) {
        this.departmentEmployeeCount = departmentEmployeeCount;
    }

    public Double getTotalMonthlyPayrollCost() {
        return totalMonthlyPayrollCost;
    }

    public void setTotalMonthlyPayrollCost(Double totalMonthlyPayrollCost) {
        this.totalMonthlyPayrollCost = totalMonthlyPayrollCost;
    }

    public Double getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(Double averageSalary) {
        this.averageSalary = averageSalary;
    }

    public Double getNetPay() {
        return netPay;
    }

    public void setNetPay(Double netPay) {
        this.netPay = netPay;
    }

    public Double getGrossPay() {
        return grossPay;
    }

    public void setGrossPay(Double grossPay) {
        this.grossPay = grossPay;
    }

    public Double getLeaveBalance() {
        return leaveBalance;
    }

    public void setLeaveBalance(Double leaveBalance) {
        this.leaveBalance = leaveBalance;
    }

    public Long getMonthlyLeavesTaken() {
        return monthlyLeavesTaken;
    }

    public void setMonthlyLeavesTaken(Long monthlyLeavesTaken) {
        this.monthlyLeavesTaken = monthlyLeavesTaken;
    }

    public Long getYearlyLeavesTaken() {
        return yearlyLeavesTaken;
    }

    public void setYearlyLeavesTaken(Long yearlyLeavesTaken) {
        this.yearlyLeavesTaken = yearlyLeavesTaken;
    }

    public Long getPendingLeaveRequests() {
        return pendingLeaveRequests;
    }

    public void setPendingLeaveRequests(Long pendingLeaveRequests) {
        this.pendingLeaveRequests = pendingLeaveRequests;
    }

    public Long getPendingLeaveApprovals() {
        return pendingLeaveApprovals;
    }

    public void setPendingLeaveApprovals(Long pendingLeaveApprovals) {
        this.pendingLeaveApprovals = pendingLeaveApprovals;
    }

    public Long getApprovedLeaves() {
        return approvedLeaves;
    }

    public void setApprovedLeaves(Long approvedLeaves) {
        this.approvedLeaves = approvedLeaves;
    }

    public Long getRejectedLeaves() {
        return rejectedLeaves;
    }

    public void setRejectedLeaves(Long rejectedLeaves) {
        this.rejectedLeaves = rejectedLeaves;
    }

    public Double getTotalAmountProcessed() {
        return totalAmountProcessed;
    }

    public void setTotalAmountProcessed(Double totalAmountProcessed) {
        this.totalAmountProcessed = totalAmountProcessed;
    }

    public Long getPendingPayrollApprovals() {
        return pendingPayrollApprovals;
    }

    public void setPendingPayrollApprovals(Long pendingPayrollApprovals) {
        this.pendingPayrollApprovals = pendingPayrollApprovals;
    }

    public Long getVerifiedPayrolls() {
        return verifiedPayrolls;
    }

    public void setVerifiedPayrolls(Long verifiedPayrolls) {
        this.verifiedPayrolls = verifiedPayrolls;
    }
}
