import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', emailId: '', password: '', role: 'EMPLOYEE' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        try {
            await registerUser(credentials);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Failed to Register');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <img src="/logo.png" alt="Easy Pay Logo" style={{ width: "80px", marginBottom: "10px" }} />
                            <h4>Join Easy Pay</h4>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">Registered Successfully! Please login.</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="emailId"
                                        value={credentials.emailId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        name="role"
                                        value={credentials.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="EMPLOYEE">Employee</option>
                                        <option value="MANAGER">Manager</option>
                                        <option value="PAYROLL_PROCESSOR">Payroll Processor</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success w-100">Register</button>
                            </form>
                            <div className="mt-3 text-center">
                                <span>Already have an account? </span>
                                <span className="text-success text-decoration-underline" style={{cursor: 'pointer'}} onClick={() => navigate('/login')}>Login here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
