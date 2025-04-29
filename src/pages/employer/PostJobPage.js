import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';

const PostJobPage = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    salary: '',
    companyName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (job.salary <= 0) {
      setError('Salary must be a positive number.');
      setLoading(false);
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const email = user ? user.email : null;

      const jobsCollectionRef = collection(firestore, 'jobs');
      await addDoc(jobsCollectionRef, {
        ...job,
        email,
        createdAt: new Date(),
      });
      alert('Job posted successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      setError(`Failed to post job. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <div
            style={{
              background: "#fdf6ee",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              padding: "2.5rem 2rem",
              marginTop: "2rem",
            }}
          >
            <h2 className="mb-4">Post a New Job</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={job.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="jobDescription">
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  rows={4}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="jobCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={job.category}
                  onChange={handleChange}
                  placeholder="Enter job category"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="jobLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                  placeholder="Enter job location"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="jobSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Post Job'}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostJobPage;