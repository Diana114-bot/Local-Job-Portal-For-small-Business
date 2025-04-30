<<<<<<< HEAD
import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarChart, Briefcase, FileEarmarkText, People, Plus } from 'react-bootstrap-icons';
import './EmployerDashboard.css'; // Create this CSS file
import { useEffect, useState } from 'react';
import axios from 'axios';

const EmployerDashboardPage = () => {
  // Mock data - replace with real API data
  const stats = {
    totalJobs: 15,
    activeJobs: 9,
    newApplications: 23,
    interviewRate: 65
  };
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/employer/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const recentApplications = [
    { id: 1, name: 'John Doe', position: 'Cashier', status: 'Pending', date: '2024-03-15' },
    { id: 2, name: 'Jane Smith', position: 'Driver', status: 'Interviewed', date: '2024-03-14' },
    { id: 3, name: 'Mike Johnson', position: 'Sales Associate', status: 'New', date: '2024-03-13' }
  ];

  const getStatusVariant = (status) => {
    switch(status.toLowerCase()) {
      case 'new': return 'primary';
      case 'pending': return 'warning';
      case 'interviewed': return 'success';
      default: return 'secondary';
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/employer/jobs/${jobId}`);
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <Container fluid className="employer-dashboard min-vh-100 p-4">
      <div className="dashboard-header mb-4">
        <h2 className="text-primary mb-1">Employer Dashboard</h2>
        <small className="text-muted">Welcome back, Local Market | Last login: 2 hours ago</small>
      </div>

      {/* Stats Overview */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="stats-card shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Total Jobs</Card.Title>
                  <h2 className="text-primary">{stats.totalJobs}</h2>
                </div>
                <Briefcase size={32} className="text-primary" />
              </div>
              <ProgressBar now={stats.totalJobs} variant="primary" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="stats-card shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Active Jobs</Card.Title>
                  <h2 className="text-success">{stats.activeJobs}</h2>
                </div>
                <FileEarmarkText size={32} className="text-success" />
              </div>
              <ProgressBar now={(stats.activeJobs/stats.totalJobs)*100} variant="success" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="stats-card shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>New Applications</Card.Title>
                  <h2 className="text-warning">{stats.newApplications}</h2>
                </div>
                <People size={32} className="text-warning" />
              </div>
              <ProgressBar now={stats.interviewRate} variant="warning" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Jobs Management */}
      <Row className="g-4 mb-4">
        <Col>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3">Manage Posted Jobs</Card.Title>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Job Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.category}</td>
                      <td>
                        <Link to={`/employer/jobs/${job.id}/edit`} className="btn btn-sm btn-outline-primary me-2">Update</Link>
                        <button
                          className="btn btn-sm btn-outline-danger me-2"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          Delete
                        </button>
                        <Link to="/employer/post-job" className="btn btn-sm btn-outline-success">Add</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Application Trends</Card.Title>
              <div className="chart-placeholder">
                <BarChart size={40} className="text-muted" />
                <span className="text-muted">Chart implementation placeholder</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Quick Analysis</Card.Title>
              <ul className="analysis-list">
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight } from 'react-bootstrap-icons';
import { Card, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EmployerSidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`bg-white shadow-sm p-3 d-flex flex-column ${collapsed ? 'align-items-center' : ''}`} style={{ minHeight: '100vh', width: collapsed ? '80px' : '250px', transition: '0.3s' }}>
      <button className="btn btn-link mb-4" onClick={toggleSidebar}>
        <List size={24} />
      </button>
      <h5 className={`text-primary mb-4 ${collapsed ? 'd-none' : ''}`}>Employer</h5>
      <ul className="list-unstyled w-100">
        <li className="mb-3">
          <Link to="/employer/dashboard" className="text-decoration-none text-dark d-flex align-items-center">
            <HouseDoor className="me-2" /> {!collapsed && 'Dashboard'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/manage-jobs" className="text-decoration-none text-dark d-flex align-items-center">
            <Briefcase className="me-2" /> {!collapsed && 'Manage Jobs'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/applications" className="text-decoration-none text-dark d-flex align-items-center">
            <People className="me-2" /> {!collapsed && 'Applications'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/settings" className="text-decoration-none text-dark d-flex align-items-center">
            <Gear className="me-2" /> {!collapsed && 'Settings'}
          </Link>
        </li>
        <li>
          <Link to="/employer/logout" className="text-decoration-none text-danger d-flex align-items-center">
            <BoxArrowRight className="me-2" /> {!collapsed && 'Logout'}
          </Link>
        </li>
      </ul>
    </div>
  );
};

const data = [
  { name: 'Jan', applications: 18 },
  { name: 'Feb', applications: 35 },
  { name: 'Mar', applications: 40 },
  { name: 'Apr', applications: 25 },
  { name: 'May', applications: 48 },
];

const EmployerDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="d-flex">
      <EmployerSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
        <h2 className="text-primary mb-2">Employer Dashboard</h2>
        <p className="text-muted mb-4">Welcome back, Local Market | Last login: 2 hours ago</p>

        <div className="d-flex flex-wrap gap-3 mb-4">
          <Card className="flex-fill p-3 shadow-sm">
            <h6>Total Jobs</h6>
            <h3 className="text-primary">15</h3>
            <ProgressBar now={60} className="mt-2" />
          </Card>

          <Card className="flex-fill p-3 shadow-sm">
            <h6>Active Jobs</h6>
            <h3 className="text-success">9</h3>
            <ProgressBar now={45} className="mt-2 bg-success" />
          </Card>

          <Card className="flex-fill p-3 shadow-sm">
            <h6>New Applications</h6>
            <h3 className="text-warning">23</h3>
            <ProgressBar now={70} className="mt-2 bg-warning" />
          </Card>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-4">
            <Card className="p-3 shadow-sm h-100">
              <h5>Post New Job</h5>
              <p>Create new job listing and reach potential candidates</p>
              <Link to="post-job" className="btn btn-primary w-100">
                Post Job
              </Link>
            </Card>
          </div>

          <div className="col-md-6 mb-4">
            <Card className="p-3 shadow-sm h-100">
              <h5>Recent Applications</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Phillip Thamaga</td>
                    <td>Software Developer</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                    <td>2025-02-15</td>
                  </tr>
                  <tr>
                    <td>Carlifonia Mohlala</td>
                    <td>Driver</td>
                    <td><span className="badge bg-success">Interviewed</span></td>
                    <td>2025-02-14</td>
                  </tr>
                  <tr>
                    <td>Tlhompho Johnson</td>
                    <td>Sales Associate</td>
                    <td><span className="badge bg-primary">New</span></td>
                    <td>2025-02-13</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 mb-4">
            <Card className="p-3 shadow-sm h-100">
              <h5>Application Trends</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="col-md-4 mb-4">
            <Card className="p-3 shadow-sm h-100">
              <h5>Quick Analysis</h5>
              <ul>
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
                <li>Top Position: Cashier (45 applications)</li>
                <li>Most Active Region: Cape Town</li>
                <li>Average Response Time: 2.3 days</li>
              </ul>
<<<<<<< HEAD
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerDashboardPage;
=======
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardPage;
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
