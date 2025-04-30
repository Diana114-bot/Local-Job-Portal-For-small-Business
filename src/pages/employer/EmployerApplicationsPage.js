import React from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';

const applications = [
  { id: 1, candidate: 'Phillip Thamaga', position: 'Software Developer', status: 'Pending', date: '2025-02-15' },
  { id: 2, candidate: 'Carlifonia Mohlala', position: 'Driver', status: 'Interviewed', date: '2025-02-14' },
  { id: 3, candidate: 'Tlhompho Johnson', position: 'Sales Associate', status: 'New', date: '2025-02-13' },
  { id: 4, candidate: 'Elizabeth Gamlashe', position: 'Cashier', status: 'Hired', date: '2025-02-10' },
];

const EmployerApplicationsPage = () => {
  return (
    <div className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      <h2 className="text-primary mb-4">Job Applications</h2>

      <Card className="p-3 shadow-sm">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.candidate}</td>
                <td>{app.position}</td>
                <td>
                  <Badge bg={
                    app.status === 'Pending' ? 'warning' :
                    app.status === 'Interviewed' ? 'info' :
                    app.status === 'Hired' ? 'success' : 'primary'
                  }>
                    {app.status}
                  </Badge>
                </td>
                <td>{app.date}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2">View</Button>
                  <Button variant="outline-success" size="sm">Update</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default EmployerApplicationsPage;
