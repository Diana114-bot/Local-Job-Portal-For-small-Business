import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPassword from './pages/ForgotPassword';
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';
import PostJobPage from './pages/employer/PostJobPage';
import EmployerApplicationsPage from './pages/employer/EmployerApplicationsPage';
import SettingsPage from './pages/employer/SettingsPage';
import ManageJobsPage from './pages/employer/ManageJobsPage';
import MyJobs from './components/dashboard/MyJobs';
import Settings from './components/dashboard/Settings';
import NotificationPage from './components/dashboard/NotificationPage';
import Profile from './components/dashboard/Profile';
import ProfilePage from './pages/employer/ProfilePage';
import AddApplicationsPage from './components/dashboard/AddApplicationsPage'; // Corrected path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
            
       
         {/* Nested Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="profile" element={<Profile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="settings" element={<Settings />} />
          <Route path="NotificationPage" element={<NotificationPage />} />
          <Route path="myapplications" element={<AddApplicationsPage />} /> {/* Add this route */}
        </Route>

        
        <Route path="/employer/login" element={<LoginPage />} />
        <Route path="/employer/register" element={<RegisterPage />} />
        <Route path="/employer/forgot-password" element={<ForgotPassword />} />
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
        <Route path="/employer/applications" element={<EmployerApplicationsPage />} />
        <Route path="/employer/dashboard/post-job" element={<PostJobPage />} />
        <Route path="/employer/settings" element={<SettingsPage />} />
        <Route path="/employer/manage-jobs" element={<ManageJobsPage />} />
        <Route path="/employer/profile" element={<ProfilePage/>} />
       </Routes>
    </Router>
  );
};

export default App;
