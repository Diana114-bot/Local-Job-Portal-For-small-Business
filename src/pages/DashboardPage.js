import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, BarChart, Bell, Briefcase, FileText, User, LogOut ,Settings } from 'react-feather';
import { ProgressBar, Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';



const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [applications, setApplications] = useState([
    { id: 1, position: 'Retail Assistant', company: 'Local Market', status: 'Pending', date: '2024-03-15' },
    { id: 2, position: 'Delivery Driver', company: 'Quick Logistics', status: 'In Review', date: '2024-03-14' },
    { id: 3, position: 'Sales Associate', company: 'City Boutique', status: 'Accepted', date: '2024-03-12' },
  ]);

  const [stats] = useState({
    applications: 15,
    interviews: 2,
    successRate: 68
  });

  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.email) {
      const [namePart] = user.email.split('@');
      const formattedName = namePart
        .replace(/[^a-zA-Z]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();
      setUsername(formattedName);
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

  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-warning text-dark';
      case 'in review': return 'bg-info text-white';
      case 'accepted': return 'bg-success text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Header */}
      <div className="top-navbar bg-white shadow-sm">
        <div className="d-flex align-items-center">
          <Button 
            variant="link" 
            className="hamburger-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h4 className="brand-name mb-0">CareerConnect Pro</h4>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <Button variant="light" className="position-relative">
            <Bell size={18} />
            <span className="badge bg-danger notification-badge">3</span>
          </Button>
          <Button 
            variant="outline-danger" 
            onClick={handleLogout}
            className="logout-btn"
          >
            <LogOut size={18} className="me-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Collapsible Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h4>CareerConnect Pro</h4>
        </div>
        <nav className="nav flex-column">
          <Button variant="link" className="nav-link active">
            <BarChart className="me-2" size={18} />
            Dashboard
          </Button>
          <Button variant="link" className="nav-link" onClick={() => navigate('profile')}>
            <User className="me-2" size={18} />
            My Profile
          </Button>
          <Button variant="link" className="nav-link"onClick={() => navigate('myjobs')}>
            <Briefcase className="me-2" size={18} />
            My Applications
          </Button>
          <Button variant="link" className="nav-link" onClick={() => navigate('NotificationPage')}>
            <Bell className="me-2" size={18} />
            Notifications
          </Button>
          <Button variant="link" className="nav-link" onClick={() => navigate('settings')}>
  <Settings className="me-2" size={18} />
  Settings
</Button>

        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {location.pathname === '/dashboard' ? (
          <>
            <h2 className="welcome-message">Welcome back, {username}</h2>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{stats.applications}</h3>
                <p>Applications</p>
              </div>
              <div className="stat-card">
                <h3>{stats.successRate}%</h3>
                <ProgressBar now={stats.successRate} variant="success" />
                <p>Interview Rate</p>
              </div>
              <div className="stat-card">
                <h3>{stats.interviews}</h3>
                <p>Upcoming Interviews</p>
              </div>
            </div>

            {/* Application Status Section */}
            <div className="application-table">
              <h5 className="table-header">Recent Applications</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(application => (
                      <tr key={application.id}>
                        <td>{application.position}</td>
                        <td>{application.company}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(application.status)}`}>
                            {application.status}
                          </span>
                        </td>
                        <td>{application.date}</td>
                        <td>
                          <Button variant="link" size="sm">
                            <FileText size={16} className="me-1" />
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Profile Completion Section */}
            <div className="profile-strength">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Profile Strength</h5>
                <Button variant="outline-primary" size="sm">
                  Complete Profile
                </Button>
              </div>
              <ProgressBar now={75} variant="primary" className="mt-2" />
              <small className="text-muted">
                Add skills and experience to increase match rate by 40%
              </small>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
