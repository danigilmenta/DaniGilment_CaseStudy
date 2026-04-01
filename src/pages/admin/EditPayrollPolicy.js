import { useState, useEffect } from "react";
import { getPolicyById, updatePolicy } from "../../services/payrollPolicyService";
import { useNavigate, useParams } from "react-router-dom";

const EditPayrollPolicy = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState({
    policyId: id,
    hraPercent: "",
    taxPercent: "",
    pfPercent: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      const res = await getPolicyById(id);
      setPolicy(res.data);
    } catch (err) {
      console.error("Error loading policy:", err);
      setError("Failed to load policy data.");
    }
  };

  const handleChange = (e) => {
    setPolicy({ ...policy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (policy.hraPercent <= 0 || policy.taxPercent <= 0 || policy.pfPercent <= 0) {
      setError("All percentages must be greater than 0");
      return;
    }

    try {
      await updatePolicy({
        policyId: policy.policyId,
        hraPercent: parseFloat(policy.hraPercent),
        taxPercent: parseFloat(policy.taxPercent),
        pfPercent: parseFloat(policy.pfPercent)
      });
      navigate("/admin/payroll");
    } catch (err) {
      console.error("Error updating policy:", err);
      setError("Failed to update policy. Please check the inputs.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-warning">Edit Payroll Policy</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0">
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Policy ID</label>
          <input
            type="text"
            className="form-control"
            value={policy.policyId}
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">HRA Percentage (%)</label>
          <input
            type="number"
            name="hraPercent"
            step="0.01"
            className="form-control"
            value={policy.hraPercent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Tax Percentage (%)</label>
          <input
            type="number"
            name="taxPercent"
            step="0.01"
            className="form-control"
            value={policy.taxPercent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">PF Percentage (%)</label>
          <input
            type="number"
            name="pfPercent"
            step="0.01"
            className="form-control"
            value={policy.pfPercent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-warning fw-bold px-4 shadow-sm">Update Policy</button>
          <button type="button" className="btn btn-outline-secondary px-4 shadow-sm" onClick={() => navigate("/admin/payroll")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPayrollPolicy;
