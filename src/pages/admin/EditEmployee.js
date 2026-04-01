import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee } from '../../services/employeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    departmentName: '',
    basicSalary: '',
    contactNumber: '',
    emailId: ''
  });

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const res = await getEmployeeById(id);
        setEmployee(res.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to load employee details');
      }
    };
    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, employee);
      navigate('/admin/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-warning">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Name</label>
          <input type="text" className="form-control" name="name" value={employee.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Department Name</label>
          <input type="text" className="form-control" name="departmentName" value={employee.departmentName || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Salary</label>
          <input type="number" className="form-control" name="basicSalary" value={employee.basicSalary} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Contact Number</label>
          <input type="text" className="form-control" name="contactNumber" value={employee.contactNumber || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Email Address</label>
          <input type="email" className="form-control" name="emailId" value={employee.emailId || ''} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-warning w-100 mt-2 fw-bold shadow-sm">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
