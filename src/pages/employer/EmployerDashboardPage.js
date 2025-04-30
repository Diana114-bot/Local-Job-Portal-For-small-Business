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
                <li>Top Position: Cashier (45 applications)</li>
                <li>Most Active Region: Cape Town</li>
                <li>Average Response Time: 2.3 days</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerDashboardPage;