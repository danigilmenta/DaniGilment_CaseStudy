import { Link } from "react-router-dom";

const EmployeeSidebar = () => {
  return (
    <div className="bg-white shadow-sm border-end" style={{ width: "240px", minHeight: "100vh" }}>
      <div className="p-4 border-bottom text-center">
        <img src="/logo.png" alt="Easy Pay" style={{ width: "100px", marginBottom: "10px" }} />
        <h4 className="m-0 text-primary fw-bold">Employee Portal</h4>
      </div>
      <div className="p-3">
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/employee/dashboard" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/employee/paystubs" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">My Pay Stubs</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/employee/leaves" className="nav-link text-secondary fw-semibold bg-light rounded shadow-sm">Request Leave</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
