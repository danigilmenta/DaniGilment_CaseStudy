import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../../services/employeeService";
import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (error) {
        const errorMsg = error.response?.data?.error || JSON.stringify(error.response?.data) || 'Failed to delete employee';
        console.error("Error deleting employee:", error.response?.data || error);
        alert(`Error: ${errorMsg}`);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">Employees</h2>
        <Link to="/admin/add-employee" className="btn btn-primary shadow-sm fw-bold"> + Add Employee</Link>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-bordered table-striped table-hover m-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.departmentName}</td>
                  <td>₹{emp.basicSalary}</td>
                  <td className="text-center">
                    <Link to={`/admin/edit-employee/${emp.empId}`} className="btn btn-sm btn-outline-primary px-3 rounded-pill shadow-sm me-2 fw-semibold">Edit</Link>
                    <button className="btn btn-sm btn-outline-danger px-3 rounded-pill shadow-sm fw-semibold" onClick={() => handleDelete(emp.empId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;