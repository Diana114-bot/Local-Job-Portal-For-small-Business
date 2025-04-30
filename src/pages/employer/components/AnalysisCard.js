import React from 'react';
import { Card } from 'react-bootstrap';

const AnalysisCard = ({ title, children }) => (
  <Card className="shadow-sm h-100">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      {children}
    </Card.Body>
  </Card>
);

export default AnalysisCard;
