import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPassword from './pages/ForgotPassword';
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';
import PostJobPage from './pages/employer/PostJobPage';
<<<<<<< HEAD
import AvailableJobs from './pages/AvailableJobs'; // Import AvailableJobs component
import Profile from './components/dashboard/Profile';
import MyJobs from './components/dashboard/MyJobs';
import Settings from './components/dashboard/Settings';
import NotificationPage from './components/dashboard/NotificationPage';
import EditJobPage from './pages/employer/EditJobPage';
=======
import EmployerApplicationsPage from './pages/employer/EmployerApplicationsPage';
import SettingsPage from './pages/employer/SettingsPage';
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
=======

>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
<<<<<<< HEAD

        {/* Nested Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="profile" element={<Profile />} />
          <Route path="myjobs" element={<MyJobs />} />
          <Route path="availablejobs" element={<AvailableJobs />} /> {/* Add this route */}
          <Route path="settings" element={<Settings />} />
          <Route path="NotificationPage" element={<NotificationPage />} />
        </Route>
=======
            
       
         {/* Nested Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />}>
  <Route path="profile" element={<Profile />} />
  <Route path="myjobs" element={<MyJobs />} />
  <Route path="settings" element={<Settings />} />
  <Route path="NotificationPage" element={<NotificationPage />} />
</Route>

        
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
        <Route path="/employer/login" element={<LoginPage />} />
        <Route path="/employer/register" element={<RegisterPage />} />
        <Route path="/employer/forgot-password" element={<ForgotPassword />} />
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
<<<<<<< HEAD
        <Route path="/employer/post-job" element={<PostJobPage />} />
        <Route path="/employer/jobs/:id/edit" element={<EditJobPage />} />
=======
        <Route path="/employer/applications" element={<EmployerApplicationsPage />} />
        <Route path="/employer/dashboard/post-job" element={<PostJobPage />} />
        <Route path="/employer/settings" element={<SettingsPage />} />
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
      </Routes>
    </Router>
  );
};

export default App;
