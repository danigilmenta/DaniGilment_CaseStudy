import { useState, useEffect } from "react";
import { getAllLeaves, approveLeave, rejectLeave } from "../../services/leaveService";

const LeaveApprovals = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error("Error loading leaves:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      loadLeaves();
    } catch (err) {
      console.error("Error approving leave:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      loadLeaves();
    } catch (err) {
      console.error("Error rejecting leave:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">Leave Approvals</h2>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-bordered table-striped table-hover m-0">
          <thead className="table-dark">
            <tr>
              <th>Leave ID</th>
              <th>Emp ID</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map(l => (
                <tr key={l.leaveId}>
                  <td>{l.leaveId}</td>
                  <td className="fw-bold">{l.empId}</td>
                  <td>{l.leaveType}</td>
                  <td>{l.startDate}</td>
                  <td>{l.endDate}</td>
                  <td>{l.reason}</td>
                  <td>
                    <span className={`badge ${l.status === 'APPROVED' ? 'bg-success' : l.status === 'REJECTED' ? 'bg-danger' : 'bg-warning'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {l.status === 'PENDING' ? (
                      <>
                        <button className="btn btn-sm btn-outline-success px-3 rounded-pill shadow-sm me-2 fw-semibold" onClick={() => handleApprove(l.leaveId)}>Approve</button>
                        <button className="btn btn-sm btn-outline-danger px-3 rounded-pill shadow-sm fw-semibold" onClick={() => handleReject(l.leaveId)}>Reject</button>
                      </>
                    ) : (
                      <span className="text-muted small">Processed</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No leave requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeaveApprovals;
