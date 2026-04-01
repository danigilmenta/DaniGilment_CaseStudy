import { useState, useEffect } from "react";
import { applyLeave } from "../../services/leaveService";
import { getEmployeeByEmail } from "../../services/employeeService";

const MyLeaves = () => {
  const [leave, setLeave] = useState({
    empId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: ""
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchEmpId = async () => {
      const email = localStorage.getItem("emailId");
      if (!email) {
        setErrorMsg("User Email missing in session.");
        return;
      }
      try {
        const res = await getEmployeeByEmail(email);
        setLeave(prev => ({ ...prev, empId: res.data.empId }));
      } catch (err) {
        console.error("Failed to map identity to employee:", err);
        setErrorMsg("Could not verify Employee Profile. Please contact HR.");
      }
    };
    fetchEmpId();
  }, []);

  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave({ ...leave, status: 'PENDING' });
      setSuccessMsg("Leave requested successfully!");
      setLeave({ empId: leave.empId, leaveType: "", startDate: "", endDate: "", reason: "" });
    } catch (error) {
      console.error("Error applying for leave:", error);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-primary">Request Leave</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0">
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Leave Type</label>
          <select name="leaveType" className="form-select" value={leave.leaveType} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Earned Leave">Earned Leave</option>
          </select>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold text-secondary">Start Date</label>
            <input type="date" name="startDate" className="form-control" value={leave.startDate} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold text-secondary">End Date</label>
            <input type="date" name="endDate" className="form-control" value={leave.endDate} onChange={handleChange} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Reason</label>
          <textarea name="reason" className="form-control" rows="3" value={leave.reason} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm mt-3">Submit Request</button>
      </form>
    </div>
  );
};
export default MyLeaves;
