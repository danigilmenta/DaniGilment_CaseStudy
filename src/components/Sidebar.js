import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white shadow-sm border-end" style={{ width: "240px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom text-center">
        <img src="/logo.png" alt="Easy Pay" style={{ width: "100px", marginBottom: "10px" }} />
        <h4 className="m-0 text-primary fw-bold">Admin Panel</h4>
      </div>

      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/employees" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Employees</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/payroll" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Payroll Config</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">System Users</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/audit-trail" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Audit Trail</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;