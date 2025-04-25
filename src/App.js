import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPassword from './pages/ForgotPassword';
import EmployerDashboardPage from './pages/employer/EmployerDashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

       
        <Route path="/dashboard" element={<DashboardPage />} />

        
        <Route path="/employer/login" element={<LoginPage />} />
        <Route path="/employer/register" element={<RegisterPage />} />
        <Route path="/employer/forgot-password" element={<ForgotPassword />} />
        <Route path="/employer/dashboard" element={<EmployerDashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
