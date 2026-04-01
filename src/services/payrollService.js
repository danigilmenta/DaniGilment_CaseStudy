import API from '../api/axios';

export const generatePayroll = (empId, policyId, month, year) => 
  API.post(`/payroll/generate?empId=${empId}&policyId=${policyId}&month=${month}&year=${year}`);

export const getPayrollById = (id) => API.get(`/payroll/${id}`);

export const getPayrollByEmployee = (empId) => API.get(`/payroll/employee/${empId}`);

export const deletePayroll = (id) => API.delete(`/payroll/delete/${id}`);

export const verifyPayroll = (id) => API.put(`/payroll/verify/${id}`);
