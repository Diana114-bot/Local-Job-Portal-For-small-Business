import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import React, { useState, useEffect } from 'react';

const getApplicationsFromFirebase = async () => {
  const applicationsCol = collection(db, 'applications');
  const snapshot = await getDocs(applicationsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'new':
      return 'primary';
    case 'pending':
      return 'warning';
    case 'interviewed':
      return 'success';
    default:
      return 'secondary';
  }
};

export { getApplicationsFromFirebase };

const RecentApplicationsTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const apps = await getApplicationsFromFirebase();
      setApplications(apps);
    };
    fetchApplications();
  }, []);

  return (
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
};

export default RecentApplicationsTable;
