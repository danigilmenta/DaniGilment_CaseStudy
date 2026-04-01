import API from '../api/axios';

export const getAllUsers = () => API.get('/users/all');
export const updateUser = (id, user) => API.put(`/users/update/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/delete/${id}`);
