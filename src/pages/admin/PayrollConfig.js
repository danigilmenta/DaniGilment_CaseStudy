import { useEffect, useState } from "react";
import { getPolicies, deletePolicy } from "../../services/payrollPolicyService";
import { Link } from "react-router-dom";

const PayrollConfig = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    try {
      const res = await getPolicies();
      setPolicies(res.data);
    } catch (error) {
      console.error("Error loading policies:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      try {
        await deletePolicy(id);
        loadPolicies();
      } catch (error) {
        console.error("Error deleting policy:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">Payroll Policies</h2>
        <Link to="/admin/add-payroll-policy" className="btn btn-primary shadow-sm fw-bold"> + Add Policy</Link>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-bordered table-striped table-hover m-0">
          <thead className="table-dark">
            <tr>
              <th>Policy ID</th>
              <th>HRA %</th>
              <th>Tax %</th>
              <th>PF %</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.length > 0 ? (
              policies.map(policy => (
                <tr key={policy.policyId}>
                  <td>{policy.policyId}</td>
                  <td>{policy.hraPercent}%</td>
                  <td>{policy.taxPercent}%</td>
                  <td>{policy.pfPercent}%</td>
                  <td className="text-center">
                    <Link to={`/admin/edit-payroll-policy/${policy.policyId}`} className="btn btn-sm btn-outline-primary px-3 rounded-pill shadow-sm me-2 fw-semibold">Edit</Link>
                    <button className="btn btn-sm btn-outline-danger px-3 rounded-pill shadow-sm fw-semibold" onClick={() => handleDelete(policy.policyId)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No policies found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollConfig;
