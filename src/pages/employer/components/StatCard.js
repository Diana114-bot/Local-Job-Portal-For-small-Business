import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const StatCard = ({ title, value, icon: Icon, color, progress }) => (
  <Card className="stats-card shadow-sm">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title>{title}</Card.Title>
          <h2 className={`text-${color}`}>{value}</h2>
        </div>
        <Icon size={32} className={`text-${color}`} />
      </div>
      <ProgressBar now={progress} variant={color} className="mt-2" />
    </Card.Body>
  </Card>
);

export default StatCard;
