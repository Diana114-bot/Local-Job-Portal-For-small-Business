import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, BarChart, Bell, Briefcase, FileText, User, LogOut ,Settings } from 'react-feather';
import { ProgressBar, Button } from 'react-bootstrap';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../assets/dashboard.css';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    // Example: Fetch jobs from your backend API (replace URL with your actual endpoint)
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications');
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const [stats] = useState({
    applications: 15,
    interviews: 2,
    successRate: 68
  });

  const [employerJobs, setEmployerJobs] = useState([
    { id: 1, title: 'Software Engineer', company: 'Tech Corp', datePosted: '2025-04-01' },
    { id: 2, title: 'Marketing Specialist', company: 'Ad Agency', datePosted: '2025-04-15' },
  ]);

  const [newJob, setNewJob] = useState({ title: '', company: '' });
  const [editingJob, setEditingJob] = useState(null);

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

  // Update an existing job
  const handleUpdateJob = () => {
    setEmployerJobs(
      employerJobs.map(job =>
        job.id === editingJob.id ? { ...editingJob, title: editingJob.title, company: editingJob.company } : job
      )
    );
    setEditingJob(null);
  };

  // Delete a job
  const handleDeleteJob = (id) => {
    setEmployerJobs(employerJobs.filter(job => job.id !== id));
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
            <Button variant="link" className="nav-link" onClick={() => navigate('myjobs')}>
          <Briefcase className="me-2" size={18} />
          My Applications
            </Button>
            <Button variant="link" className="nav-link" onClick={() => navigate('availablejobs')}>
          <Briefcase className="me-2" size={18} />
          Available Jobs
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

            {/* poi */}
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
                      <th>Posted By</th> {/* New column */}
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
                        <td>{application.postedBy}</td> {/* New data */}
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

            {/* Employer Jobs Section */}
            <div className="employer-jobs">
              <h5>Manage Your Jobs</h5>

              {/* Add Job Form */}
             
              {/* Employer Jobs Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Date Posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employerJobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.datePosted}</td>
                      <td>
                        <Button variant="link" size="sm" onClick={() => setEditingJob(job)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteJob(job.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Edit Job Form */}
              {editingJob && (
                <div className="edit-job-form">
                  <h6>Edit Job</h6>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={editingJob.company}
                    onChange={(e) => setEditingJob({ ...editingJob, company: e.target.value })}
                  />
                  <Button variant="success" onClick={handleUpdateJob}>
                    Save Changes
                  </Button>
                </div>
              )}
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
