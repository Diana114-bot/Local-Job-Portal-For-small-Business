import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarChart, Briefcase, FileEarmarkText, People, Plus } from 'react-bootstrap-icons';
import './EmployerDashboard.css'; // Create this CSS file

const EmployerDashboardPage = () => {
  // Mock data - replace with real API data
  const stats = {
    totalJobs: 15,
    activeJobs: 9,
    newApplications: 23,
    interviewRate: 65
  };

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

      {/* Quick Actions */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="action-card shadow-sm h-100">
            <Card.Body className="d-flex flex-column">
              <div className="mb-3">
                <Plus size={24} className="text-primary mb-2" />
                <Card.Title>Post New Job</Card.Title>
                <Card.Text>Create new job listing and reach potential candidates</Card.Text>
              </div>
              <Link to="/employer/post-job" className="btn btn-primary mt-auto">Post Job</Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title className="mb-3">Recent Applications</Card.Title>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map(application => (
                    <tr key={application.id}>
                      <td>{application.name}</td>
                      <td>{application.position}</td>
                      <td>
                        <Badge bg={getStatusVariant(application.status)}>
                          {application.status}
                        </Badge>
                      </td>
                      <td>{application.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Sections */}
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