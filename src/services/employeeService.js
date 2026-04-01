import API from "../api/axios";

export const getEmployees = () => API.get("/employees/all");

export const getEmployeeById = (id) =>
  API.get(`/employees/${id}`);

export const getEmployeeByEmail = (emailId) =>
  API.get(`/employees/by-email/${emailId}`);

export const createEmployee = (data) =>
  API.post("/employees/add", data);

export const updateEmployee = (id, data) =>
  API.put(`/employees/update`, { ...data, empId: id });

export const deleteEmployee = (id) =>
  API.delete(`/employees/delete/${id}`);