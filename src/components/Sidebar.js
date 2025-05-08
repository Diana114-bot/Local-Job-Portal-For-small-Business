import React from 'react';
import { 
  Home, 
  Briefcase, 
  FileText, 
  User, 
  Bell, 
  Settings, 
  PlusCircle,
  Users,
  BarChart,
  LogOut
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const navSections = [
    {
      title: 'Job Seeker',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
        { key: 'jobs', label: 'Browse Jobs', icon: <Briefcase size={18} /> },
        { key: 'applications', label: 'My Applications', icon: <FileText size={18} /> },
        { key: 'profile', label: 'My Profile', icon: <User size={18} /> }
      ]
    },
    {
      title: 'Employer',
      items: [
        { key: 'post-job', label: 'Post a Job', icon: <PlusCircle size={18} /> },
        { key: 'manage-jobs', label: 'Manage Jobs', icon: <Briefcase size={18} /> },
        { key: 'candidates', label: 'View Candidates', icon: <Users size={18} /> }
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
      title: 'Admin',
      items: [
        { key: 'analytics', label: 'Analytics', icon: <BarChart size={18} /> }
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
