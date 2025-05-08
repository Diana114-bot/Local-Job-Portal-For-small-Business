import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main App Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';

// Employer Pages
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';
import PostJobPage from './pages/employer/PostJobPage';
import EmployerApplicationsPage from './pages/employer/EmployerApplicationsPage';
import SettingsPage from './pages/employer/SettingsPage';

// Job Seeker Components
import DashboardPage from './pages/DashboardPage'; // Added missing import
import Profile from './components/dashboard/Profile';
import MyJobs from './components/dashboard/MyJobs';
import Settings from './components/dashboard/Settings';
import NotificationPage from './components/dashboard/NotificationPage';

// Admin Components
import AdminLayout from './admin/AdminLayout'; // Fixed import path to correct location
import AdminDashboard from './admin/pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Employer Auth Routes */}
        <Route path="/employer/login" element={<LoginPage />} />
        <Route path="/employer/register" element={<RegisterPage />} />
        <Route path="/employer/forgot-password" element={<ForgotPassword />} />

        {/* Job Seeker Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['jobseeker']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<NotificationPage />} />
        </Route>

        {/* Employer Dashboard */}
        <Route
          path="/employer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/applications"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/dashboard/post-job"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <PostJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/settings"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;