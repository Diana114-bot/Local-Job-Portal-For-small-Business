import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'react-bootstrap-icons';

const PostJobPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    category: '',
    deadline: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form data:', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({
        title: '',
        description: '',
        location: '',
        salary: '',
        category: '',
        deadline: ''
      });
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="mb-4">
          <Link to="/employer/dashboard" className="text-decoration-none">
            <ArrowLeft className="me-2" /> Back to Dashboard
          </Link>
        </div>

        <Card className="shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
          <Card.Body>
            <div className="text-center mb-4">
              <Briefcase size={40} className="text-primary mb-3" />
              <h2>Post New Job</h2>
              <p className="text-muted">Fill in the details below to list a new job opportunity</p>
            </div>

            {submitted && <Alert variant="success" className="text-center">Job posted successfully!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Job Title</Form.Label>
                <Form.Control 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Job Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      isInvalid={!!errors.location}
                    />
                    <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
                  </Form.Group>
                </div>
                
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Salary (ZAR)</Form.Label>
                    <Form.Control 
                      type="number" 
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      isInvalid={!!errors.salary}
                    />
                    <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Job Category</Form.Label>
                    <Form.Select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option value="">Select Category</option>
                      <option value="retail">Retail</option>
                      <option value="logistics">Logistics</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="sales">Sales</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Application Deadline</Form.Label>
                    <Form.Control 
                      type="date" 
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      isInvalid={!!errors.deadline}
                    />
                    <Form.Control.Feedback type="invalid">{errors.deadline}</Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>

              <div className="text-center">
                <Button variant="primary" type="submit" size="lg" className="px-5">
                  Post Job
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;