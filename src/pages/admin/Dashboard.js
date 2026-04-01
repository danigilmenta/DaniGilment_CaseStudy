import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    departmentEmployeeCount: {},
    totalMonthlyPayrollCost: 0,
    averageSalary: 0
  });

  useEffect(() => {
    getAdminDashboard()
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Error loading admin metrics:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary fw-bold">Executive Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 border-start border-primary border-4 text-center p-4 bg-light">
            <h5 className="text-secondary fw-bold">Total Monthly Payroll Cost</h5>
            <h2 className="text-primary mt-2">₹{metrics.totalMonthlyPayrollCost.toLocaleString()}</h2>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 border-start border-success border-4 text-center p-4 bg-light">
            <h5 className="text-secondary fw-bold">Average Employee Salary</h5>
            <h2 className="text-success mt-2">₹{metrics.averageSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</h2>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm border-0 p-4 bg-white">
            <h5 className="text-secondary fw-bold mb-3">Headcount by Department</h5>
            <div className="row">
              {Object.entries(metrics.departmentEmployeeCount).length > 0 ? (
                Object.entries(metrics.departmentEmployeeCount).map(([dept, count]) => (
                  <div key={dept} className="col-md-4 mb-3">
                    <div className="p-3 border rounded shadow-sm bg-light">
                      <span className="fw-bold fs-5 text-dark">{dept}</span>
                      <span className="float-end fs-5 text-primary fw-bold">{count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-muted">No department data available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;