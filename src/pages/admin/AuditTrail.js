import React, { useState, useEffect } from 'react';
import API from '../../api/axios'; 

const AuditTrail = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await API.get('/audit-logs');
            setLogs(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching audit logs", err);
            setError("Failed to fetch audit logs.");
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (error) return <div className="alert alert-danger m-3">{error}</div>;

    return (
        <div>
            <h2 className="mb-4 text-primary"><i className="bi bi-clock-history me-2"></i>System Audit Trail</h2>
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Timestamp</th>
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center py-4">No audit logs found.</td></tr>
                                ) : (
                                    logs.map(log => (
                                        <tr key={log.id}>
                                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                                            <td><span className="badge bg-secondary">{log.username}</span></td>
                                            <td><strong>{log.action}</strong></td>
                                            <td className="text-muted">{log.details}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditTrail;
