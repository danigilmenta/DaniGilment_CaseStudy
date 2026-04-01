import { useEffect, useState } from "react";
import { getProcessorDashboard } from "../../services/dashboardService";

const PPDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getProcessorDashboard()
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Error loading processor metrics:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4 fw-bold">Payroll Processor Dashboard</h2>

      {metrics && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-primary border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Total Amount Processed</h5>
              <h2 className="text-primary mt-2">₹{metrics.totalAmountProcessed?.toLocaleString()}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-warning border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Pending Payrolls</h5>
              <h2 className="text-warning mt-2">{metrics.pendingPayrollApprovals}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-success border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Verified Payrolls</h5>
              <h2 className="text-success mt-2">{metrics.verifiedPayrolls}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PPDashboard;
