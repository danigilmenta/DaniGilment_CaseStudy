import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0 fw-bold">User Management</h2>
        <Link to="/register" className="btn btn-primary fw-bold shadow-sm">
          + Add New User
        </Link>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className="table table-bordered table-striped table-hover m-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td className="fw-bold text-secondary">{user.username}</td>
                <td>{user.emailId}</td>
                <td>
                  <span className="badge bg-info text-dark">{user.role}</span>
                </td>
                <td className="text-center">
                  <Link to={`/admin/users/edit/${user.userId}`} className="btn btn-sm btn-warning me-2 fw-bold">Edit</Link>
                  <button onClick={() => handleDelete(user.userId)} className="btn btn-sm btn-danger fw-bold">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
