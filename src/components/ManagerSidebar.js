import { Link } from "react-router-dom";

const ManagerSidebar = () => {
  return (
    <div className="bg-white shadow-sm border-end" style={{ width: "240px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom text-center">
        <img src="/logo.png" alt="Easy Pay" style={{ width: "100px", marginBottom: "10px" }} />
        <h4 className="m-0 text-primary fw-bold">Manager Portal</h4>
      </div>
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/manager/dashboard" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/manager/leave-approvals" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Leave Approvals</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/manager/team-payrolls" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Team Payrolls</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManagerSidebar;
