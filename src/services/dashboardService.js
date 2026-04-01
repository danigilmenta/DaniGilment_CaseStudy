import API from '../api/axios';

export const getAdminDashboard = () => API.get('/dashboard/admin');
export const getEmployeeDashboard = (empId) => API.get(`/dashboard/employee/${empId}`);
export const getManagerDashboard = () => API.get('/dashboard/manager');
export const getProcessorDashboard = () => API.get('/dashboard/processor');
