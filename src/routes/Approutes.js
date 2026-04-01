import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import PayrollProcessorLayout from "../layouts/PayrollProcessorLayout";
import EmployeeLayout from "../layouts/EmployeeLayout";
import ManagerLayout from "../layouts/ManagerLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Dashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import AddEmployee from "../pages/admin/AddEmployee";
import EditEmployee from "../pages/admin/EditEmployee";
import PayrollConfig from "../pages/admin/PayrollConfig";
import AddPayrollPolicy from "../pages/admin/AddPayrollPolicy";
import EditPayrollPolicy from "../pages/admin/EditPayrollPolicy";
import Users from "../pages/admin/Users";
import EditUser from "../pages/admin/EditUser";
import AuditTrail from "../pages/admin/AuditTrail";

import PPDashboard from "../pages/payroll-processor/PPDashboard";
import GeneratePayroll from "../pages/payroll-processor/GeneratePayroll";
import VerifyPayroll from "../pages/payroll-processor/VerifyPayroll";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import PayStubs from "../pages/employee/PayStubs";
import MyLeaves from "../pages/employee/MyLeaves";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import LeaveApprovals from "../pages/manager/LeaveApprovals";
import TeamPayrolls from "../pages/manager/TeamPayrolls";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="employees" element={<Employees />} />
              <Route path="add-employee" element={<AddEmployee />} />
              <Route path="edit-employee/:id" element={<EditEmployee />} />
              <Route path="payroll" element={<PayrollConfig />} />
              <Route path="add-payroll-policy" element={<AddPayrollPolicy />} />
              <Route path="edit-payroll-policy/:id" element={<EditPayrollPolicy />} />
              <Route path="users" element={<Users />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="audit-trail" element={<AuditTrail />} />
            </Routes>
          </AdminLayout>
        } />

        <Route path="/payroll-processor/*" element={
          <PayrollProcessorLayout>
            <Routes>
              <Route path="dashboard" element={<PPDashboard />} />
              <Route path="generate" element={<GeneratePayroll />} />
              <Route path="verify" element={<VerifyPayroll />} />
              <Route path="audit-trail" element={<AuditTrail />} />
            </Routes>
          </PayrollProcessorLayout>
        } />

        <Route path="/employee/*" element={
          <EmployeeLayout>
            <Routes>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="paystubs" element={<PayStubs />} />
              <Route path="leaves" element={<MyLeaves />} />
            </Routes>
          </EmployeeLayout>
        } />

        <Route path="/manager/*" element={
          <ManagerLayout>
            <Routes>
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route path="leave-approvals" element={<LeaveApprovals />} />
              <Route path="team-payrolls" element={<TeamPayrolls />} />
            </Routes>
          </ManagerLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;