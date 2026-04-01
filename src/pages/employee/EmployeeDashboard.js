import { useEffect, useState } from "react";
import { getEmployeeDashboard } from "../../services/dashboardService";
import { getEmployeeByEmail } from "../../services/employeeService";

const EmployeeDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) {
        setError("User Email missing in session.");
        return;
      }
      try {
        const empRes = await getEmployeeByEmail(email);
        const empId = empRes.data.empId;
        const res = await getEmployeeDashboard(empId);
        setMetrics(res.data);
      } catch (err) {
        console.error("Failed to load metrics:", err);
        setError("Could not load dashboard metrics.");
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4 fw-bold">My Dashboard</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {metrics && (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 border-start border-success border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Total Net Pay (YTD)</h5>
              <h2 className="text-success mt-2">₹{metrics.netPay.toLocaleString()}</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0 border-start border-secondary border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Total Gross Pay (YTD)</h5>
              <h2 className="text-secondary mt-2">₹{metrics.grossPay.toLocaleString()}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-4 text-center bg-white">
              <h5 className="text-secondary fw-bold">Leave Balance</h5>
              <h2 className="text-primary mt-2">{metrics.leaveBalance}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-4 text-center bg-white">
              <h5 className="text-secondary fw-bold">Leaves Taken</h5>
              <h2 className="text-danger mt-2">{metrics.yearlyLeavesTaken}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-4 text-center bg-white">
              <h5 className="text-secondary fw-bold">Pending Leave Requests</h5>
              <h2 className="text-warning mt-2">{metrics.pendingLeaveRequests}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmployeeDashboard;
