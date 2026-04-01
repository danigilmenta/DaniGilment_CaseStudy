import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
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
            const response = await loginUser(credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('emailId', response.data.emailId);


                const role = response.data.role;
                if (role === 'ADMIN') navigate('/admin');
                else if (role === 'PAYROLL_PROCESSOR') navigate('/payroll-processor');
                else if (role === 'MANAGER') navigate('/manager');
                else navigate('/employee');
            }
        } catch (err) {
            setError(err.response?.data || 'Invalid Login Attempt');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <img src="/logo.png" alt="Easy Pay Logo" style={{ width: "80px", marginBottom: "10px" }} />
                            <h4>Login to Easy Pay</h4>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}
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
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                            <div className="mt-3 text-center">
                                <span className="text-primary text-decoration-underline me-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/forgot-password')}>Forgot Password?</span>
                                <span>Don't have an account? </span>
                                <span className="text-primary text-decoration-underline" style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Register here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
