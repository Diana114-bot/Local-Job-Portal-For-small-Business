import React from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  User, 
  Bell, 
  Settings, 
  BarChart,
  LogOut
} from 'react-feather';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navSections = [
    {
      title: 'Job Seeker',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
        { key: 'browse', label: 'Browse Jobs', icon: <Briefcase size={18} /> },
        { key: 'applications', label: 'My Applications', icon: <FileText size={18} /> },
        { key: 'profile', label: 'My Profile', icon: <User size={18} /> }
      ]
    },
    {
      title: 'General',
      items: [
        { key: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: 3 },
        { key: 'settings', label: 'Settings', icon: <Settings size={18} /> }
      ]
    },
    {
      title: 'Insights',
      items: [
        { key: 'analytics', label: 'Career Analytics', icon: <BarChart size={18} /> }
      ]
    }
  ];

  return (
    <div className="sidebar bg-primary text-white d-flex flex-column p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="mb-4">CareerConnect Pro</h4>
      
      {navSections.map((section, index) => (
        <div key={index} className="mb-4">
          <small className="text-muted opacity-75">{section.title}</small>
          <div className="d-flex flex-column gap-2 mt-2">
            {section.items.map(({ key, label, icon, badge }) => (
              <button
                key={key}
                className={`btn btn-link text-white text-start d-flex align-items-center justify-content-between p-2 rounded ${
                  activeTab === key ? 'bg-white-10 fw-bold' : 'hover-bg-white-05'
                }`}
                onClick={() => setActiveTab(key)}
              >
                <div className="d-flex align-items-center gap-2">
                  {icon}
                  {label}
                </div>
                {badge && <span className="badge bg-light text-dark">{badge}</span>}
              </button>
            ))}
          </div>
          {index < navSections.length - 1 && <hr className="opacity-25 my-3" />}
        </div>
      ))}

      <div className="mt-auto border-top pt-3">
        <button 
          className="btn btn-link text-white text-start w-100 d-flex align-items-center gap-2"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;