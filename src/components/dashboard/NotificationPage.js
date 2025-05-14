

import React, { useEffect, useState } from 'react';
import { Bell } from 'react-feather';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import '../../assets/dashboard.css'; // Optional custom styles

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    
    const fetchedNotifications = [
      {
        id: 1,
        message: 'New job match: Graphic Designer at Pixel Studio',
        date: '2025-04-23',
        type: 'job-match',
      },
      {
        id: 2,
        message: 'Your application to "Retail Assistant" was viewed',
        date: '2025-04-22',
        type: 'application-update',
      },
      {
        id: 3,
        message: 'Upcoming interview reminder: City Boutique, Apr 28',
        date: '2025-04-21',
        type: 'reminder',
      },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  return (
    <div className="container mt-4">
      <h3><Bell className="me-2" size={20} /> Notifications</h3>
      <Card className="mt-3 shadow-sm">
        <ListGroup variant="flush">
          {notifications.length === 0 ? (
            <ListGroup.Item>No new notifications</ListGroup.Item>
          ) : (
            notifications.map((note) => (
              <ListGroup.Item key={note.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{note.message}</strong>
                  <div className="text-muted small">{note.date}</div>
                </div>
                <Badge bg={
                  note.type === 'job-match' ? 'success' :
                  note.type === 'application-update' ? 'info' :
                  'warning'
                }>
                  {note.type.replace(/-/g, ' ')}
                </Badge>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </div>
  );
};

export default NotificationPage;
