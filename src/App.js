import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main App Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';

// Job Seeker Pages
import DashboardPage from './pages/DashboardPage';
import Profile from './components/dashboard/Profile';
import MyJobs from './components/dashboard/MyJobs';
import Settings from './components/dashboard/Settings';
import NotificationPage from './components/dashboard/NotificationPage';

// Employer Pages
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';
import PostJobPage from './pages/employer/PostJobPage';
import EmployerApplicationsPage from './pages/employer/EmployerApplicationsPage';
import SettingsPage from './pages/employer/SettingsPage';
// import ProfilePage from './pages/employer/ProfilePage'; // commented to avoid errors
// import AddApplicationsPage from './components/dashboard/AddApplicationsPage'; // commented to avoid errors

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';

// Shared
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

        {/* Job Seeker Dashboard Routes */}
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
          {/* <Route path="myapplications" element={<AddApplicationsPage />} /> */}
        </Route>

        {/* Employer Dashboard Routes */}
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
        {/* <Route
          path="/employer/profile"
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Routes */}
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

        {/* Fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
