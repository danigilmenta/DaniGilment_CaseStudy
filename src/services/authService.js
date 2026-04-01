import API from "../api/axios";

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const resetPassword = (data) => API.post("/auth/reset-password", data);

export const forgotPassword = (data) => API.post("/auth/reset-password", data);
