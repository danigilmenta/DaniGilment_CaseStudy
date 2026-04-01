import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../../services/employeeService';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    departmentName: '',
    basicSalary: '',
    contactNumber: '',
    emailId: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...employee,
        basicSalary: employee.basicSalary ? parseFloat(employee.basicSalary) : 0
      };
      await createEmployee(payload);
      navigate('/admin/employees');
    } catch (error) {
      const errorMsg = error.response?.data?.error || JSON.stringify(error.response?.data) || 'Failed to add employee';
      console.error('Error adding employee:', error.response?.data || error);
      alert(`Error: ${errorMsg}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Name</label>
          <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Department Name</label>
          <input type="text" className="form-control" name="departmentName" value={employee.departmentName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Salary</label>
          <input type="number" className="form-control" name="basicSalary" value={employee.basicSalary} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Contact Number</label>
          <input type="text" className="form-control" name="contactNumber" value={employee.contactNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Email Address</label>
          <input type="email" className="form-control" name="emailId" value={employee.emailId} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2 fw-bold shadow-sm">Save Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
