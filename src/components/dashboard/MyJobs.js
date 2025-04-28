import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, LogOut } from 'react-feather';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';

const MyJobsPage = () => {
  const [username, setUsername] = useState('');

  const appliedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      dateApplied: "2025-04-10",
      status: "Pending",
      category: "Development"
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Creative Minds Studio",
      dateApplied: "2025-04-05",
      status: "Accepted",
      category: "Design"
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "CodeWorks",
      dateApplied: "2025-03-28",
      status: "Rejected",
      category: "Development"
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Accepted':
        return 'badge bg-success';
      case 'Rejected':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

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

  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="btn-group mb-4" role="group">
          <h5 className="mb-0 fw-semibold">Job Applications</h5>
        </div>

        {/* Applied Jobs Content */}
        <div className="row">
          {appliedJobs.map((job) => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
                  <p className="card-text mb-1"><strong>Applied on:</strong> {job.dateApplied}</p>
                  <p className="card-text mb-1"><strong>Category:</strong> {job.category}</p> {/* Added Category */}
                  <p className="card-text mb-2">
                    <strong>Status:</strong>{' '}
                    <span className={getStatusBadgeClass(job.status)}>
                      {job.status}
                    </span>
                  </p>
                  <button className="btn btn-sm btn-outline-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;
