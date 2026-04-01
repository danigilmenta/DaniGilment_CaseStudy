import API from '../api/axios';

export const applyLeave = (leaveData) => API.post(`/leaves/apply`, leaveData);

export const approveLeave = (id) => API.put(`/leaves/approve/${id}`);

export const rejectLeave = (id) => API.put(`/leaves/reject/${id}`);

export const getLeaveById = (id) => API.get(`/leaves/${id}`);

export const getAllLeaves = () => API.get(`/leaves/all`);

export const deleteLeave = (id) => API.delete(`/leaves/delete/${id}`);
