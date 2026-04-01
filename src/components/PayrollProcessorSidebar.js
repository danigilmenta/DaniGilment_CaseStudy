import { Link } from "react-router-dom";

const PayrollProcessorSidebar = () => {
  return (
    <div className="bg-white shadow-sm border-end" style={{ width: "240px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom text-center">
        <img src="/logo.png" alt="Easy Pay" style={{ width: "100px", marginBottom: "10px" }} />
        <h4 className="m-0 text-primary fw-bold">Payroll Dept.</h4>
      </div>
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/payroll-processor/dashboard" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/payroll-processor/generate" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Generate Payroll</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/payroll-processor/verify" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Verify Payroll</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/payroll-processor/audit-trail" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Audit Trail</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PayrollProcessorSidebar;
