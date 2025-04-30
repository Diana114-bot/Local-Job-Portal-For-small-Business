import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'react-bootstrap-icons';

const PostJobPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    categoryType: '',
    salary: '',
    salaryType: 'Per Month',
    postalCode: '',
    city: '',
    streetName: '',
    province: '',
    applicationDeadline: '',
    employmentType: '',
    recruiterEmail: '',
    recruiterCompanyName: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.city || !formData.streetName || !formData.province) {
      newErrors.location = 'Complete location details are required';
    }
    if (!formData.salary) newErrors.salary = 'Salary is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
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
        jobTitle: '',
        description: '',
        categoryType: '',
        salary: '',
        salaryType: 'Per Month',
        postalCode: '',
        city: '',
        streetName: '',
        province: '',
        applicationDeadline: '',
        employmentType: '',
        recruiterEmail: '',
        recruiterCompanyName: '',
        phoneNumber: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

            <form onSubmit={handleSubmit}>
              <h5 className="text-primary mb-3">Job Details</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    className="form-control"
                    placeholder="Type job title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Category (Industry)</label>
                  <select
                    name="categoryType"
                    className="form-select"
                    value={formData.categoryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Retails & Sales">Retail & Sales (e.g cashier,sales assistant)</option>
                    <option value="Hospitality" >Hospitality (e.g waiter, bartender)</option>
                    <option value="Transportation & Sales">Transportation (e.g taxi driver,delivery driver)</option>
                    <option value="Tech">Tech (e.g computer technician, web assistant)</option>
                    <option value="Admin">Admin (e.g clerk, receptionist)</option>
                    <option value="General Labor " >General Labor (e.g cleaning, construction)</option>
                    <option value="Skilled Trades">Skilled Trades (e.g plumber,electrician)</option>
                    <option value="Education">Education (e.g tutor, teaching assistant)</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    placeholder="Detailed responsibilities and requirements"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Address Section */}
                <h5 className="text-primary mt-4 mb-2">Job Location</h5>

                <div className="col-md-6">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="form-control"
                    placeholder="Enter postal code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Street Name</label>
                  <input
                    type="text"
                    name="streetName"
                    className="form-control"
                    placeholder="Enter street name"
                    value={formData.streetName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Province</label>
                  <input
                    type="text"
                    name="province"
                    className="form-control"
                    placeholder="Enter province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Employment & Salary */}
                <div className="col-md-6">
                  <label className="form-label">Application Deadline</label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    className="form-control"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Salary */}
                <div className="col-md-6">
                  <label className="form-label">Salary Range</label>
                  <div className="input-group">
                    <span className="input-group-text">R</span>
                    <input
                      type="text"
                      name="salary"
                      className="form-control"
                      placeholder="Salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                  <select
                    name="salaryType"
                    className="form-select mt-2"
                    value={formData.salaryType}
                    onChange={handleChange}
                  >
                    <option>Per Month</option>
                    <option>Per Year</option>
                    <option>Per Hour</option>
                    <option>Per Week</option>
                  </select>
                </div>

              </div>

              {/* Company Information */}
              <h5 className="text-primary mt-5 mb-3">Company Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Recruiter Company Name</label>
                  <input
                    type="text"
                    name="recruiterCompanyName"
                    className="form-control"
                    placeholder="Recruiter Name"
                    value={formData.recruiterCompanyName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Recruiter Email</label>
                  <input
                    type="email"
                    name="recruiterEmail"
                    className="form-control"
                    placeholder="Email"
                    value={formData.recruiterEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="+27 (000) 000-0000"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>


              {/* Submit */}
              <div className="row g-3 mt-5">
                <div className="col-12 d-grid">
                  <button className="btn btn-primary btn-lg" type="submit"  disabled={submitted}>
                    Post Vacancy
                  </button>
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
  );
};

export default PostJobPage;