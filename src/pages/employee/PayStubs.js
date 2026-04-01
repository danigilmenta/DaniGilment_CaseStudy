import { useState, useEffect } from "react";
import { getPayrollByEmployee } from "../../services/payrollService";
import { getEmployeeByEmail } from "../../services/employeeService";

const PayStubs = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStubs = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) {
        setError("User Email missing.");
        return;
      }
      try {
        const empRes = await getEmployeeByEmail(email);
        const empId = empRes.data.empId;
        const res = await getPayrollByEmployee(empId);
        setPayrolls(res.data);
      } catch (err) {
        console.error("Error fetching pay stubs:", err);
        setError("Failed to load pay stubs.");
      }
    };
    fetchStubs();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">My Pay Stubs</h2>
      </div>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-bordered table-striped table-hover m-0">
            <thead className="table-dark">
              <tr>
                <th>Payroll ID</th>
                <th>Month/Year</th>
                <th>Basic Salary</th>
                <th>HRA</th>
                <th>Tax</th>
                <th>PF</th>
                <th>Net Salary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.length > 0 ? (
                payrolls.map(p => (
                  <tr key={p.payrollId}>
                    <td>{p.payrollId}</td>
                    <td>{p.month}/{p.year}</td>
                    <td>₹{p.basicSalary}</td>
                    <td>₹{p.hra}</td>
                    <td>₹{p.tax}</td>
                    <td>₹{p.pf}</td>
                    <td className="fw-bold text-success">₹{p.netSalary}</td>
                    <td>
                      <span className={`badge ${p.status === 'VERIFIED' ? 'bg-success' : 'bg-warning'}`}>
                        {p.status || 'PENDING'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No pay stubs found for this Employee ID.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default PayStubs;
