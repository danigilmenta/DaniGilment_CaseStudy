import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllUsers, updateUser } from "../../services/userService";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    emailId: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getAllUsers();
        const found = res.data.find(u => u.userId === parseInt(id));
        if (found) {
          setUser({
            username: found.username,
            emailId: found.emailId,
            password: "",
            role: found.role
          });
        }
      } catch (err) {
        setErrorMsg("Failed to load user info");
      }
    };
    loadUser();
  }, [id]);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user);
      setSuccessMsg("User credentials updated securely!");
      setTimeout(() => navigate("/admin/users"), 1500);
    } catch (err) {
      setErrorMsg("Failed to update user.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 fw-bold">Modify Identity</h2>

      {successMsg && <div className="alert alert-success fw-bold">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger fw-bold">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light border-0 border-start  border-4">
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input type="text" className="form-control" name="username" value={user.username} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input type="email" className="form-control" name="emailId" value={user.emailId} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold text-danger">Reset Password (Optional)</label>
          <input type="password" placeholder="Leave blank to keep unchanged" className="form-control border-danger" name="password" value={user.password} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">System Role</label>
          <select className="form-select" name="role" value={user.role} onChange={handleChange} required>
            <option value="EMPLOYEE">EMPLOYEE</option>
            <option value="MANAGER">MANAGER</option>
            <option value="PAYROLL_PROCESSOR">PAYROLL_PROCESSOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn  w-100 fw-bold shadow-sm text-white">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
