import { useEffect, useState } from "react";
import { getManagerDashboard } from "../../services/dashboardService";

const ManagerDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getManagerDashboard()
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Error loading manager metrics:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4 fw-bold">Manager Dashboard</h2>

      {metrics && (
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-warning border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Pending Leave Approvals</h5>
              <h2 className="text-warning mt-2">{metrics.pendingLeaveApprovals}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-success border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Approved Leaves</h5>
              <h2 className="text-success mt-2">{metrics.approvedLeaves}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 border-start border-danger border-4 p-4 bg-light">
              <h5 className="text-secondary fw-bold">Rejected Leaves</h5>
              <h2 className="text-danger mt-2">{metrics.rejectedLeaves}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ManagerDashboard;
