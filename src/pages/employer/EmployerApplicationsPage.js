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
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure auth and db are correctly imported



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

const EmployerApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const currentUser = auth.currentUser; // Get the current logged-in user

  useEffect(() => {
    const fetchApplicationsAndProfiles = async () => {
      try {
        if (!currentUser) {
          console.error("No current user found.");
          return;
        }

        // Step 1: Fetch applications where jobId matches the jobs posted by the current user
        const jobsQuery = query(
          collection(db, 'jobs'),
          where('recruiterId', '==', currentUser.uid) // Assuming recruiterId is stored in the jobs collection
        );
        const jobsSnapshot = await getDocs(jobsQuery);

        // Extract job IDs for the current user
        const jobIds = jobsSnapshot.docs.map((jobDoc) => jobDoc.id);

        if (jobIds.length === 0) {
          console.warn("No jobs found for the current user.");
          setApplications([]);
          return;
        }

        // Step 2: Fetch applications where jobId matches the job IDs
        const applicationsQuery = query(
          collection(db, 'applications'),
          where('jobId', 'in', jobIds) // Use the job IDs to filter applications
        );
        const applicationsSnapshot = await getDocs(applicationsQuery);

        // Step 3: Fetch profiles for each application
        const combinedData = await Promise.all(
          applicationsSnapshot.docs.map(async (applicationDoc) => {
            const applicationData = applicationDoc.data();

            // Fetch the corresponding profile using uid
            let profileData = {};
            if (applicationData.userId) {
              const profileQuery = query(
                collection(db, 'profiles'),
                where('uid', '==', applicationData.userId) // Use uid instead of email
              );
              const profileSnapshot = await getDocs(profileQuery);
              if (!profileSnapshot.empty) {
                profileData = profileSnapshot.docs[0].data(); // Assuming one profile per user
              }
            }

            // Combine application and profile data
            return {
              applicationId: applicationDoc.id,
              ...applicationData,
              profile: profileData,
            };
          })
        );

        // Step 4: Set the combined data to state
        setApplications(combinedData);
      } catch (error) {
        console.error('Error fetching applications and profiles:', error);
      }
    };

    fetchApplicationsAndProfiles();
  }, [currentUser]);

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
      app.applicationId === pendingShortlist.applicationId
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
      app.applicationId === pendingReject.applicationId
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

        {/* Candidate Cards */}
        <Row>
          {applications.map((app) => (
            <Col md={4} key={app.applicationId} className="mb-4">
              <Card className="shadow-sm border rounded-4 h-100">
                <Card.Body>
                  <Card.Title>{app.profile?.name || 'Unknown Candidate'}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{app.jobTitle}</Card.Subtitle>
                  <Card.Text>
                    <strong>Email:</strong> {app.profile?.email || 'N/A'} <br />
                    <strong>Phone:</strong> {app.profile?.phone || 'N/A'} <br />
                    <strong>Status:</strong> {app.status || 'Pending'}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" onClick={() => handleViewProfile(app)}>
                      View Profile
                    </Button>
                    <Button variant="outline-success" onClick={() => handleShortlist(app)}>
                      Shortlist
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleReject(app)}>
                      Reject
                    </Button>
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
                    src={selectedApplication.profile?.profile_picture || selectedApplication.profile_picture}
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                    style={{ width: '150px', height: '150px' }}
                  />
                  <h5>{selectedApplication.profile?.name || 'Unknown Candidate'}</h5>
                  <p><FaEnvelope /> {selectedApplication.profile?.email || 'N/A'}</p>
                  <p><FaPhone /> {selectedApplication.profile?.phone || 'N/A'}</p>
                </Col>
                <Col md={1} className="d-none d-md-block">
                  <div style={{ height: '100%', width: '2px', backgroundColor: '#007bff' }}></div>
                </Col>
                <Col md={7}>
                  <strong><h6>About</h6></strong>
                  <p>{selectedApplication.profile?.about || "No information available"}</p>

                  <strong><h6>Job Preferences</h6></strong>
                  <p>{selectedApplication.profile?.job_preferences || "No preferences specified"}</p>

                  <strong><h6>Social Links</h6></strong>
                  <p>
                    LinkedIn: <a 
                      href={selectedApplication.profile?.social_links?.linkedin || "#"}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      {selectedApplication.profile?.social_links?.linkedin || "Not provided"}
                    </a>
                  </p>
                  <p>
                    GitHub: <a 
                      href={selectedApplication.profile?.social_links?.github || "#"}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      {selectedApplication.profile?.social_links?.github || "Not provided"}
                    </a>
                  </p>
                  <p>
                    Portfolio: <a 
                      href={selectedApplication.profile?.social_links?.portfolio || "#"}
                      target="_blank" 
                      rel="noreferrer"
                    >
                      {selectedApplication.profile?.social_links?.portfolio || "Not provided"}
                    </a>
                  </p>

                  <strong><h6>Work Experience</h6></strong>
                  <p>{selectedApplication.profile?.work_experience || "No work experience provided"}</p>
                  <strong><h6>Education</h6></strong>
                  <p>{selectedApplication.profile?.education || "No education details provided"}</p>
                  <strong><h6>Skills</h6></strong>
                  <p>{selectedApplication.profile?.skills || "No skills listed"}</p>

                  <p><FaPaperclip /> <a href={selectedApplication.profile?.resume_link || "#"}>View Resume</a></p>
                  <p><FaPaperclip /> <a href={selectedApplication.profile?.cover_letter_link || "#"}>View Cover Letter</a></p>
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
                  value={selectedApplication?.profile?.email || ""}
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
