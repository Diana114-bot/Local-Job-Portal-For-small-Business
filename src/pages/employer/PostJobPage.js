import React, { useState } from 'react';
import { Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PostJobPage = () => {
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
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
    recruiterEmail: user?.email || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const db = getFirestore();
        const auth = getAuth();
        const user = auth.currentUser;
        const userEmail = user?.email || 'unknown';

        const jobData = {
          ...formData,
          userEmail,
          recruiterId: user?.uid || 'unknown',
          createdAt: new Date(),
        };

        await addDoc(collection(db, "jobs"), jobData);
        setSubmitted(true);
        // Redirect to dashboard after a short delay if needed
        setTimeout(() => {
          navigate("/employer/dashboard");
        }, 1000);
      } catch (error) {
        console.error("Error posting job:", error.message);
      }
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
                    <option value="Retails & Sales">Retail & Sales (e.g cashier, sales assistant)</option>
                    <option value="Hospitality">Hospitality (e.g waiter, bartender)</option>
                    <option value="Transportation & Sales">Transportation (e.g taxi driver, delivery driver)</option>
                    <option value="Tech">Tech (e.g computer technician, web assistant)</option>
                    <option value="Admin">Admin (e.g clerk, receptionist)</option>
                    <option value="General Labor">General Labor (e.g cleaning, construction)</option>
                    <option value="Skilled Trades">Skilled Trades (e.g plumber, electrician)</option>
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

              <div className="row g-3 mt-5">
                <div className="col-12 d-grid">
                  <button className="btn btn-primary btn-lg" type="submit" disabled={submitted}>
                    Post Vacancy
                  </button>
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;
