import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BarChart, Bell, Briefcase, FileText, User, LogOut } from 'react-feather';
import { ProgressBar, Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';


const MyJobsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                    <Button variant="link" className="nav-link">
                        <User className="me-2" size={18} />
                        My Profile
                    </Button>
                    <Button variant="link" className="nav-link" onClick={() => navigate('/jobs')}>
                        <Briefcase className="me-2" size={18} />
                        My Applications
                    </Button>
                    <Button variant="link" className="nav-link" onClick={() => navigate('/settings')}>
                        <Bell className="me-2" size={18} />
                        Notifications
                    </Button>
                </nav>
            </div>


            <div className="main-content">
                <div className="alert alert-info">
                    📧 Ensure to enable notifications in settings for updates.
                </div>

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