import React, { useState } from 'react';
import {
  Modal, Button, Form, Row, Col, Card, Toast, Pagination, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import {
  FaPaperclip, FaLink, FaSignature, FaImage,
  FaEnvelope, FaPhone
} from 'react-icons/fa';



import {
  ClipboardData,
  FileEarmarkText,
  CheckCircle,
  XCircle
} from "react-bootstrap-icons";

import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

const EmployerSidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`bg-white shadow-sm p-3 d-flex flex-column ${collapsed ? 'align-items-center' : ''}`} style={{ minHeight: '100vh', width: collapsed ? '80px' : '250px', transition: '0.3s' }}>
      <button className="btn btn-link mb-4" onClick={toggleSidebar}>
        <List size={24} />
      </button>
      <h5 className={`text-primary mb-4 ${collapsed ? 'd-none' : ''}`}>Employer</h5>
      <ul className="list-unstyled w-100">
        <li className="mb-3">
          <Link to="/employer/dashboard" className="text-decoration-none text-dark d-flex align-items-center">
            <HouseDoor className="me-2" /> {!collapsed && 'Dashboard'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/manage-jobs" className="text-decoration-none text-dark d-flex align-items-center">
            <Briefcase className="me-2" /> {!collapsed && 'Manage Jobs'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/applications" className="text-decoration-none text-dark d-flex align-items-center">
            <People className="me-2" /> {!collapsed && 'Applications'}
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/employer/settings" className="text-decoration-none text-dark d-flex align-items-center">
            <Gear className="me-2" /> {!collapsed && 'Settings'}
          </Link>
        </li>
        <li>
          <Link to="/employer/logout" className="text-decoration-none text-danger d-flex align-items-center">
            <BoxArrowRight className="me-2" /> {!collapsed && 'Logout'}
          </Link>
        </li>
      </ul>
    </div>
  );
};


const applicationsMock = [
  {
    application_id: "app123",
    job_id: "job789",
    job_title: "Frontend Developer",
    job_seeker_id: "user456",
    candidate_name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    cover_letter: "I am passionate about frontend development...",
    resume_link: "#",
    profile_picture: "https://via.placeholder.com/150",
    address: "123 Tech Street",
    dob: "1990-01-01",
    nationality: "South African",
    job_preferences: "Remote, Full-time",
    social_links: {
      linkedin: "https://linkedin.com/in/jcalebporter",
      github: "https://github.com/johndoe",
      portfolio: "https://caleb.dev"
    },
    work_experience: "3 years at Tech Corp as UI Developer",
    education: "BSc in Computer Science, University of Cape Town",
    skills: "React, JavaScript, CSS, HTML",
    creation_time: "2025-04-28",
    status: "New",
    about: "Creative and dedicated Frontend Developer with a love for clean UI and scalable design systems."
  },
  {
    application_id: "app124",
    job_id: "job790",
    job_title: "Backend Developer",
    job_seeker_id: "user457",
    candidate_name: "Sarah Mokoena",
    email: "sarah.mokoena@example.com",
    phone: "081-234-5678",
    cover_letter: "I have solid experience building scalable APIs...",
    resume_link: "#",
    profile_picture: "https://via.placeholder.com/150",
    address: "456 Backend Lane",
    dob: "1988-07-15",
    nationality: "South African",
    job_preferences: "Hybrid, Full-time",
    social_links: {
      linkedin: "https://linkedin.com/in/sarahmokoena",
      github: "https://github.com/sarahdev",
      portfolio: "https://sarahcodes.dev"
    },
    work_experience: "5 years at Backendify as a Backend Engineer",
    education: "BSc in Information Technology, Wits University",
    skills: "Node.js, Express, SQL, MongoDB",
    creation_time: "2025-04-29",
    status: "New",
    about: "Reliable and efficient developer who enjoys building powerful server-side logic."
  },
  {
    application_id: "app125",
    job_id: "job791",
    job_title: "Full Stack Developer",
    job_seeker_id: "user458",
    candidate_name: "Thabo Ndlovu",
    email: "thabo.ndlovu@example.com",
    phone: "072-111-2222",
    cover_letter: "With my experience across the stack, I can contribute immediately...",
    resume_link: "#",
    profile_picture: "https://via.placeholder.com/150",
    address: "789 Fullstack Drive",
    dob: "1992-03-22",
    nationality: "South African",
    job_preferences: "On-site, Contract",
    social_links: {
      linkedin: "https://linkedin.com/in/thabondlovu",
      github: "https://github.com/thabon",
      portfolio: "https://thabodev.co.za"
    },
    work_experience: "4 years at WebWorks as Full Stack Dev",
    education: "BSc in Software Engineering, UNISA",
    skills: "React, Node.js, PostgreSQL, Docker",
    creation_time: "2025-04-27",
    status: "New",
    about: "Full stack developer with a passion for building performant and user-friendly apps."
  },
  {
    application_id: "app126",
    job_id: "job792",
    job_title: "UI/UX Designer",
    job_seeker_id: "user459",
    candidate_name: "Lerato Khumalo",
    email: "lerato.k@example.com",
    phone: "074-987-6543",
    cover_letter: "Designing intuitive and beautiful interfaces is what I love to do...",
    resume_link: "#",
    profile_picture: "https://via.placeholder.com/150",
    address: "321 Creative Blvd",
    dob: "1995-11-30",
    nationality: "South African",
    job_preferences: "Remote, Freelance",
    social_links: {
      linkedin: "https://linkedin.com/in/leratokhumalo",
      github: "https://github.com/leratodesigns",
      portfolio: "https://leratokhumalo.design"
    },
    work_experience: "2 years freelance + 1 year at Designly",
    education: "Diploma in Digital Design, Vega School",
    skills: "Figma, Adobe XD, Sketch, HTML/CSS",
    creation_time: "2025-04-26",
    status: "New",
    about: "UI/UX designer driven by empathy, aesthetics, and usability."
  }
];

const EmployerApplicationsPage = () => {




  const [applications, setApplications] = useState(applicationsMock);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [pendingShortlist, setPendingShortlist] = useState(null);
  const [pendingReject, setPendingReject] = useState(null);

  const handleShortlist = (app) => {
    setSelectedApplication(app);
    setPendingShortlist(app);
    setShowEmailModal(true);
  };

  const confirmShortlist = () => {
    const updated = applications.map(app =>
      app.application_id === pendingShortlist.application_id
        ? { ...app, status: "Shortlisted" }
        : app
    );
    setApplications(updated);
    setToastMessage("Application Shortlisted and Email Sent!");
    resetEmailModal();
  };

  const handleReject = (app) => {
    setSelectedApplication(app);
    setPendingReject(app);
    setShowEmailModal(true);
  };

  const confirmReject = () => {
    const updated = applications.map(app =>
      app.application_id === pendingReject.application_id
        ? { ...app, status: "Rejected" }
        : app
    );
    setApplications(updated);
    setToastMessage("Application Rejected and Email Sent!");
    resetEmailModal();
  };

  const resetEmailModal = () => {
    setShowEmailModal(false);
    setEmailContent("");
    setEmailSubject("");
    setEmailFrom("");
    setPendingShortlist(null);
    setPendingReject(null);
  };

  const handleViewProfile = (app) => {
    setSelectedApplication(app);
    setShowProfileModal(true);
  };

  const isShortlisting = !!pendingShortlist;

   const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);
  return (
    <div className="d-flex">
       <EmployerSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
    <div className="container mt-4">
      
      <h2>Manage Applications</h2>
      <p className="text-muted">Dashboard &gt; Manage Applications</p>

      {/* Stat Cards */}
      <Row className="mb-4">
  <Col md={6} lg={3}>
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>Total Applications</Card.Title>
            <h2 className="text-primary">{applications.length}</h2>
          </div>
          <ClipboardData size={32} className="text-primary" />
        </div>
        
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} lg={3}>
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>New Applications</Card.Title>
            <h2 className="text-info">
              {applications.filter(a => a.status === "New").length}
            </h2>
          </div>
          <FileEarmarkText size={32} className="text-info" />
        </div>
       
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} lg={3}>
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>Shortlisted</Card.Title>
            <h2 className="text-success">
              {applications.filter(a => a.status === "Shortlisted").length}
            </h2>
          </div>
          <CheckCircle size={32} className="text-success" />
        </div>
       
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} lg={3}>
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>Rejected</Card.Title>
            <h2 className="text-danger">
              {applications.filter(a => a.status === "Rejected").length}
            </h2>
          </div>
          <XCircle size={32} className="text-danger" />
        </div>
       
      </Card.Body>
    </Card>
  </Col>
</Row>
      {/* Search & Filter Form */}
      <Form className="mb-4">
        <Row>
          <Col><Form.Control placeholder="Search by name, email, or job title..." /></Col>
          <Col>
            <Form.Select>
              <option>All Job Titles</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Select>
              <option>All Statuses</option>
              <option>New</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control type="date" />
          </Col>
        </Row>
      </Form>

      {/* Candidate Cards */}
      <Row>
        {applications.map(app => (
          <Col md={4} key={app.application_id} className="mb-4">
            <Card className="shadow-sm border rounded-4 h-100">
              <Card.Body>
                <Card.Title>{app.candidate_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{app.job_title}</Card.Subtitle>
                <Card.Text>
                  <strong>Email:</strong> {app.email}<br />
                  <strong>Phone:</strong> {app.phone}<br />
                  <strong>Status:</strong> {app.status}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" onClick={() => handleViewProfile(app)}>View Profile</Button>
                  <Button variant="outline-success" onClick={() => handleShortlist(app)}>Shortlist</Button>
                  <Button variant="outline-danger" onClick={() => handleReject(app)}>Reject</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: '#fff' }}>
          <Modal.Title>Candidate Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplication && (
            <Row>
              <Col md={4} className="text-center">
                <img
                  src={selectedApplication.profile_picture}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5>{selectedApplication.candidate_name}</h5>
                <p><FaEnvelope /> {selectedApplication.email}</p>
                <p><FaPhone /> {selectedApplication.phone}</p>
              </Col>
              <Col md={1} className="d-none d-md-block">
                <div style={{ height: '100%', width: '2px', backgroundColor: '#007bff' }}></div>
              </Col>
              <Col md={7}>
                <strong><h6>About</h6></strong>
                <p>{selectedApplication.about}</p>

                <strong><h6>Job Preferences</h6></strong>
                <p>{selectedApplication.job_preferences}</p>

                <strong><h6>Social Links</h6></strong>
                <p>LinkedIn: <a href={selectedApplication.social_links.linkedin} target="_blank" rel="noreferrer">{selectedApplication.social_links.linkedin}</a></p>
                <p>GitHub: <a href={selectedApplication.social_links.github} target="_blank" rel="noreferrer">{selectedApplication.social_links.github}</a></p>
                <p>Portfolio: <a href={selectedApplication.social_links.portfolio} target="_blank" rel="noreferrer">{selectedApplication.social_links.portfolio}</a></p>

                <strong><h6>Work Experience</h6></strong>
                <p>{selectedApplication.work_experience}</p>
                <strong><h6>Education</h6></strong>
                <p>{selectedApplication.education}</p>
                <strong><h6>Skills</h6></strong>
                <p>{selectedApplication.skills}</p>

                <p><FaPaperclip /> <a href={selectedApplication.resume_link}>View Resume</a></p>
                <p><FaPaperclip /> <a href={selectedApplication.resume_link}>View Cover Letter</a></p>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Email Modal */}
      <Modal show={showEmailModal} onHide={resetEmailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="email"
                value={emailFrom}
                onChange={(e) => setEmailFrom(e.target.value)}
                placeholder="Your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="email"
                value={selectedApplication?.email || ""}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message:</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Write your message here..."
              />
              <div className="d-flex gap-3 mt-2">
                <OverlayTrigger overlay={<Tooltip>Attach files</Tooltip>}>
                  <span><FaPaperclip style={{ cursor: 'pointer' }} /></span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Insert link</Tooltip>}>
                  <span><FaLink style={{ cursor: 'pointer' }} /></span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Insert signature</Tooltip>}>
                  <span><FaSignature style={{ cursor: 'pointer' }} /></span>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Insert photo</Tooltip>}>
                  <span><FaImage style={{ cursor: 'pointer' }} /></span>
                </OverlayTrigger>
              </div>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={isShortlisting ? confirmShortlist : confirmReject}>
              {isShortlisting ? "Shortlist & Send" : "Reject & Send"}
            </Button>
            <Button variant="secondary" onClick={resetEmailModal}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Toast */}
      <Toast
        show={!!toastMessage}
        onClose={() => setToastMessage("")}
        delay={3000}
        autohide
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

     
     
    </div>
    </div>
  );
};


export default EmployerApplicationsPage;
