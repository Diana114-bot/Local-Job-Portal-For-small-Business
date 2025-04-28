import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const getStatusVariant = (status) => {
  switch(status.toLowerCase()) {
    case 'new': return 'primary';
    case 'pending': return 'warning';
    case 'interviewed': return 'success';
    default: return 'secondary';
  }
};

const RecentApplicationsTable = ({ applications }) => (
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
      {applications.map(app => (
        <tr key={app.id}>
          <td>{app.name}</td>
          <td>{app.position}</td>
          <td>
            <Badge bg={getStatusVariant(app.status)}>
              {app.status}
            </Badge>
          </td>
          <td>{app.date}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default RecentApplicationsTable;
