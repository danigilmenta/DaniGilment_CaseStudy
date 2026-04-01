import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

const ForgotPassword = () => {
    const [credentials, setCredentials] = useState({ username: '', newPassword: '' });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setMessage(null);
        setError(null);
        try {
            await resetPassword(credentials);
            setMessage("Password reset successfully. Redirecting to login...");
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data || 'Failed to reset password. Check your username.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <img src="/logo.png" alt="Easy Pay Logo" style={{ width: "80px", marginBottom: "10px" }} />
                            <h4>Easy Pay Reset Password</h4>
                        </div>
                        <div className="card-body p-4">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {message && <div className="alert alert-success">{message}</div>}
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
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="newPassword"
                                        value={credentials.newPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                            </form>
                            <div className="mt-3 text-center">
                                <span className="text-primary text-decoration-underline" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Back to Login</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
