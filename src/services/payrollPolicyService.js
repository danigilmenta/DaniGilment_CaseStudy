import API from "../api/axios";

export const getPolicies = () => API.get("/policies/all");

export const getPolicyById = (id) =>
  API.get(`/policies/${id}`);

export const createPolicy = (data) =>
  API.post("/policies/add", data);

export const updatePolicy = (data) =>
  API.put(`/policies/update`, data);

export const deletePolicy = (id) =>
  API.delete(`/policies/delete/${id}`);
