import ManagerSidebar from "../components/ManagerSidebar";

import { useNavigate } from "react-router-dom";

const ManagerLayout = ({ children }) => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }} className="bg-light">
      <ManagerSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center border-bottom">
          <h5 className="m-0 text-secondary fw-normal">Easypay Manager Portal</h5>
          <div>
            <span className="text-muted small fw-semibold me-3">{username}</span>
            <button onClick={handleLogout} className="btn btn-sm btn-outline-danger shadow-sm fw-bold">Logout</button>
          </div>
        </header>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};
export default ManagerLayout;
