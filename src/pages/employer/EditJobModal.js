import React from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';

const EditJobModal = ({ show, onHide, jobData }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: '#fff' }}>
        <Modal.Title>Edit Job Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form action="/your-submit-endpoint" method="POST">
          <h4 className="mb-3 text-primary">Edit Job</h4>

          {/* Category */}
          <Row className="mb-3">
            <Col md={6}>
              <label className="form-label">Category</label>
              <input
                type="text"
                name="categoryType"
                className="form-control"
                defaultValue={jobData.categoryType}
              />
            </Col>
          </Row>

          {/* Description */}
          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-3"
            name="description"
            rows="4"
            defaultValue={jobData.description}
          ></textarea>

          <hr />

          {/* Location */}
          <h5 className="text-primary mt-4">Location</h5>
          <Row>
            <Col md={6}>
              <label className="form-label">Street</label>
              <input
                type="text"
                name="streetName"
                className="form-control"
                defaultValue={jobData.streetName}
              />
            </Col>
            <Col md={6}>
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                defaultValue={jobData.city}
              />
            </Col>
            <Col md={6} className="mt-3">
              <label className="form-label">Province</label>
              <input
                type="text"
                name="province"
                className="form-control"
                defaultValue={jobData.province}
              />
            </Col>
            <Col md={6} className="mt-3">
              <label className="form-label">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                className="form-control"
                defaultValue={jobData.postalCode}
              />
            </Col>
          </Row>

          <hr />

          {/* Salary */}
          <h5 className="text-primary mt-4">Salary</h5>
          <Row>
            <Col md={6}>
              <label className="form-label">Salary Amount</label>
              <input
                type="number"
                name="salary"
                className="form-control"
                defaultValue={jobData.salary}
              />
            </Col>
            <Col md={6}>
              <label className="form-label">Salary Type</label>
              <select
                name="salaryType"
                className="form-select"
                defaultValue={jobData.salaryType}
              >
                <option value="">Select Type</option>
                <option value="per month">Per Month</option>
                <option value="per hour">Per Hour</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </Col>
          </Row>

          {/* Application Deadline */}
          <div className="mt-4">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              className="form-control"
              defaultValue={jobData.deadline ? jobData.deadline.substring(0, 10) : ''}
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" type="submit" form="editJobForm">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditJobModal;
