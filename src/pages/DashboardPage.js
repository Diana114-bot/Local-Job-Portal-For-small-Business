import React, { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext'; // Assuming you're using context
import '../assets/dashboard.css';

const DashboardPage = () => {
  const [key, setKey] = useState('overview');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const renderContent = () => {
    switch (key) {
      case 'overview':
        return (
          <>
            <h5>Welcome to your dashboard</h5>
            <p>Here’s a summary of your activity.</p>
          </>
        );
      case 'profile':
        return (
          <>
            <h5>Your Profile</h5>
            <p>Profile details and edit options.</p>
          </>
        );
      case 'jobs':
        return (
          <>
            <h5>My Jobs</h5>
            <p>Your job listings and applications.</p>
          </>
        );
      case 'settings':
        return (
          <>
            <h5>Settings</h5>
            <p>Account and preference settings.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar bg-primary text-white p-3 vh-100" style={{ width: '250px' }}>
        <h4 className="mb-4">LocalHireZone</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className={`nav-link text-white btn btn-link ${key === 'overview' ? 'fw-bold' : ''}`} onClick={() => setKey('overview')}>Overview</button>
          </li>
          <li className="nav-item mb-2">
            <button className={`nav-link text-white btn btn-link ${key === 'profile' ? 'fw-bold' : ''}`} onClick={() => setKey('profile')}>Profile</button>
          </li>
          <li className="nav-item mb-2">
            <button className={`nav-link text-white btn btn-link ${key === 'jobs' ? 'fw-bold' : ''}`} onClick={() => setKey('jobs')}>My Jobs</button>
          </li>
          <li className="nav-item mb-2">
            <button className={`nav-link text-white btn btn-link ${key === 'settings' ? 'fw-bold' : ''}`} onClick={() => setKey('settings')}>Settings</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div className="d-flex justify-content-between align-items-center p-3 shadow-sm border-bottom">
          <div>
            <h5 className="mb-0">Dashboard</h5>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative" title="Notifications">
              <Bell size={18} />
              {/* Optional notification badge */}
              {/* <span className="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle"></span> */}
            </button>
            <div className="d-flex align-items-center gap-2">
              <img src="https://i.pravatar.cc/30" alt="avatar" className="rounded-circle" width="30" height="30" />
              <span className="fw-semibold">{userEmail}</span>
            </div>
            <button className="btn btn-outline-danger btn-sm" title="Logout" onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
