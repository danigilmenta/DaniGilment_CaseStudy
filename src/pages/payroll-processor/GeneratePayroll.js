import { useState, useEffect } from "react";
import { generatePayroll } from "../../services/payrollService";
import { getEmployees } from "../../services/employeeService";
import { getPolicies } from "../../services/payrollPolicyService";

const GeneratePayroll = () => {
  const [employees, setEmployees] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    empId: "",
    policyId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const empRes = await getEmployees();
      const polRes = await getPolicies();
      setEmployees(empRes.data);
      setPolicies(polRes.data);
    } catch (err) {
      console.error("Error loading dropdown data:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generatePayroll(formData.empId, formData.policyId, formData.month, formData.year);
      setSuccessMsg("Payroll generated successfully with PENDING status.");
      setFormData({ ...formData, empId: "", policyId: "" });
    } catch (err) {
      console.error("Error generating payroll:", err);
      alert("Failed to generate payroll.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-primary">Generate Payroll</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0">
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Select Employee</label>
          <select name="empId" className="form-select" value={formData.empId} onChange={handleChange} required>
            <option value="">-- Choose Employee --</option>
            {employees.map(e => <option key={e.empId} value={e.empId}>{e.empId} - {e.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-secondary">Select Policy</label>
          <select name="policyId" className="form-select" value={formData.policyId} onChange={handleChange} required>
            <option value="">-- Choose Policy --</option>
            {policies.map(p => <option key={p.policyId} value={p.policyId}>Policy ID: {p.policyId} (HRA {p.hraPercent}%, PF {p.pfPercent}%)</option>)}
          </select>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold text-secondary">Month (1-12)</label>
            <input type="number" name="month" className="form-control" value={formData.month} onChange={handleChange} min="1" max="12" required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold text-secondary">Year</label>
            <input type="number" name="year" className="form-control" value={formData.year} onChange={handleChange} min="2000" required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm mt-3">Calculate & Generate</button>
      </form>
    </div>
  );
};
export default GeneratePayroll;
