import { useState } from "react";
import { getPayrollByEmployee, verifyPayroll } from "../../services/payrollService";

const VerifyPayroll = () => {
  const [empId, setEmpId] = useState("");
  const [payrolls, setPayrolls] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!empId) return;
    loadPayrolls();
  };

  const loadPayrolls = async () => {
    try {
      const res = await getPayrollByEmployee(empId);
      setPayrolls(res.data);
      setSearched(true);
    } catch (err) {
      console.error("Error fetching payrolls:", err);
    }
  };

  const handleVerify = async (payrollId) => {
    try {
      await verifyPayroll(payrollId);
      loadPayrolls();
    } catch (err) {
      console.error("Error verifying payroll:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">Verify Payroll</h2>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4 bg-light">
        <form onSubmit={handleSearch} className="d-flex gap-3 align-items-end">
          <div className="flex-grow-1">
            <label className="form-label fw-bold text-secondary">Find Generated Payrolls by Employee ID</label>
            <input 
              type="number" 
              className="form-control" 
              value={empId} 
              onChange={(e) => setEmpId(e.target.value)} 
              placeholder="Enter Employee ID" 
              required
            />
          </div>
          <button type="submit" className="btn btn-primary fw-bold shadow-sm px-4">Search</button>
        </form>
      </div>

      {searched && (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-bordered table-striped table-hover m-0">
            <thead className="table-dark">
              <tr>
                <th>Payroll ID</th>
                <th>Month/Year</th>
                <th>Basic Salary</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.length > 0 ? (
                payrolls.map(p => (
                  <tr key={p.payrollId}>
                    <td>{p.payrollId}</td>
                    <td>{p.month}/{p.year}</td>
                    <td>₹{p.basicSalary}</td>
                    <td className="fw-bold">₹{p.netSalary}</td>
                    <td>
                      <span className={`badge ${p.status === 'VERIFIED' ? 'bg-success' : 'bg-warning'}`}>
                        {p.status || 'PENDING'}
                      </span>
                    </td>
                    <td className="text-center">
                      {(p.status === 'PENDING' || !p.status) ? (
                        <button className="btn btn-sm btn-outline-success px-3 rounded-pill shadow-sm fw-semibold" onClick={() => handleVerify(p.payrollId)}>
                          Verify Data
                        </button>
                      ) : (
                        <span className="text-muted small">Verified</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No payrolls found for this Employee.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default VerifyPayroll;
