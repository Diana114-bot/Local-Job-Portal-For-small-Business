import React from 'react';
import { Card } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const PostJobCard = () => (
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
);

export default PostJobCard;
