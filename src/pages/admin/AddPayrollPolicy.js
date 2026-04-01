import { useState } from "react";
import { createPolicy } from "../../services/payrollPolicyService";
import { useNavigate } from "react-router-dom";

const AddPayrollPolicy = () => {
  const [policy, setPolicy] = useState({
    hraPercent: "",
    taxPercent: "",
    pfPercent: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      await createPolicy({
        hraPercent: parseFloat(policy.hraPercent),
        taxPercent: parseFloat(policy.taxPercent),
        pfPercent: parseFloat(policy.pfPercent)
      });
      navigate("/admin/payroll");
    } catch (err) {
      console.error("Error creating policy:", err);
      setError("Failed to create policy. Please check the inputs.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-primary">Add Payroll Policy</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0">
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
            placeholder="e.g. 10.5"
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
            placeholder="e.g. 15.0"
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
            placeholder="e.g. 12.0"
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-primary fw-bold px-4 shadow-sm">Save Policy</button>
          <button type="button" className="btn btn-outline-secondary px-4 shadow-sm" onClick={() => navigate("/admin/payroll")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPayrollPolicy;
