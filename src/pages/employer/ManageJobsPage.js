import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight, CheckCircle, Person } from 'react-bootstrap-icons';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Row, Col ,Button } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';
import EditJobModal from './EditJobModal';

// Sidebar Component
const EmployerSidebar = ({ collapsed, toggleSidebar }) => {
    return (
        <div
            className={`bg-white shadow-sm p-3 d-flex flex-column ${collapsed ? 'align-items-center' : ''
                }`}
            style={{
                minHeight: '100vh',
                width: collapsed ? '80px' : '250px',
                transition: '0.3s',
            }}
        >
            <button className="btn btn-link mb-4" onClick={toggleSidebar}>
                <List size={24} />
            </button>
            <h5 className={`text-primary mb-4 ${collapsed ? 'd-none' : ''}`}>
                Employer
            </h5>
            <ul className="list-unstyled w-100">
                <li className="mb-3">
                    <Link
                        to="/employer/dashboard"
                        className="text-decoration-none text-dark d-flex align-items-center"
                    >
                        <HouseDoor className="me-2" /> {!collapsed && 'Dashboard'}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link
                        to="/employer/profile"
                        className="text-decoration-none text-dark d-flex align-items-center"
                    >
                        <Person className="me-2" /> {!collapsed && 'Profile'}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link
                        to="/employer/manage-jobs"
                        className="text-decoration-none text-dark d-flex align-items-center"
                    >
                        <Briefcase className="me-2" /> {!collapsed && 'Manage Jobs'}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link
                        to="/employer/applications"
                        className="text-decoration-none text-dark d-flex align-items-center"
                    >
                        <People className="me-2" /> {!collapsed && 'Applications'}
                    </Link>
                </li>
                <li className="mb-3">
                    <Link
                        to="/employer/settings"
                        className="text-decoration-none text-dark d-flex align-items-center"
                    >
                        <Gear className="me-2" /> {!collapsed && 'Settings'}
                    </Link>
                </li>
                <li>
                    <Link
                        to="/employer/logout"
                        className="text-decoration-none text-danger d-flex align-items-center"
                    >
                        <BoxArrowRight className="me-2" /> {!collapsed && 'Logout'}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

// StatCard
function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="bg-white p-4 rounded shadow text-center h-100">
            {Icon && <Icon size={30} className="text-primary mb-2" />}
            <div className="h5 fw-bold">{value}</div>
            <div className="text-muted">{title}</div>
        </div>
    );
}

// Main Page Component
const ManageJobsPage = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showJobModal, setShowJobModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    //side bar
    const toggleSidebar = () => setCollapsed(!collapsed);

    //handle view modal
    const handleViewProfile = (job) => {
        setSelectedJob(job);
        setShowJobModal(true);
    };

    // handle edit modal
    const [showModal, setShowModal] = useState(false);
    const handleEditJob = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };

    //handle delete modal
    const handleDeleteClick = (job) => {
        setSelectedJob(job);
        setShowDeleteModal(true);
    };

    //handling deleting from database (backend)
    const handleConfirmDelete = (jobToDelete) => {
        // Example: call your API or update state here
        console.log("Deleting job:", jobToDelete);
    
        setShowDeleteModal(false);
        setSelectedJob(null);
    };

    //close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJob(null); // Reset the selected job
    };


    const [search, setSearch] = useState('');
    const jobData = [ //array of jobs replaced with  database jobs
        {
            title: 'General Ledger Accountant',
            created: 'Dec 03, 2017',
            deadline: 'Oct 22, 2019',
            applications: 17,
            salary: '10000',
            categoryType: 'Hosipitality',
            city: "Kempton Park",
            streetName: "49 Namen Street",
            province: "Gauteng",
            postalCode: "0183",
            status: 'Active',
            description: 'Assist with accounting responsibilities'
        },
        {
            title: 'Car Financed Required For Bank',
            created: 'Dec 03, 2017',
            deadline: 'Oct 22, 2018',
            applications: 14,
            status: 'Active',
            salary: '15758',
            categoryType: 'Finance',
            city: "Pretoria",
            streetName: "49 Namen Street",
            province: "Gauteng",
            postalCode: "0183",
            description: 'Assist office finance'
        },
        {
            title: 'UX/UI Designer',
            created: 'Dec 03, 2017',
            deadline: 'Oct 22, 2020',
            applications: 5,
            status: 'Active',
            salary: '1888',
            categoryType: 'Tech',
            city: "Soshanguve",
            streetName: "49 Namen Street",
            province: "Gauteng",
            postalCode: "0183",
            description: 'Assist in developing responsive websites using HTML, CSS, and JavaScript'
        },
    ];

    //search job according to title, category type and will return filtered array that match the search
    const filteredJobs = Array.isArray(jobData) ? jobData.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.categoryType.toLowerCase().includes(search.toLowerCase())
    ) : [];


    return (
        <div className="d-flex">
            <EmployerSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div className="flex-grow-1 p-4">
                <h3 className="mb-4">Manage Jobs</h3>

                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <StatCard title="Jobs Posted" value="2" icon={Briefcase} />
                    </div>
                    <div className="col-md-4">
                        <StatCard title="Applications" value="3" icon={People} />
                    </div>
                    <div className="col-md-4">
                        <StatCard title="Active Jobs" value="1" icon={CheckCircle} />
                    </div>
                </div>

                {/* search field */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control w-25"
                        placeholder="Search Job"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select className="form-select w-25">
                        <option value="newest">Sort by: Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <div className="table-responsive bg-white shadow-sm rounded">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Job Title</th>
                                <th>Applications</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*display all jobs or those searched */}
                            {filteredJobs.map((job, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <strong>{job.title}</strong>
                                        <br />
                                        <small className="text-muted">{job.city}</small>
                                        <br />
                                        <small className="text-secondary">
                                            Created: {job.created} | Expiry: {job.deadline}
                                        </small>
                                    </td>
                                    <td>{job.applications}</td>
                                    <td>
                                        <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleViewProfile(job)}>
                                            <FaEye />
                                        </button>
                                        <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEditJob(job)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClick(job)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* view job modal */}
                <Modal show={showJobModal} onHide={() => setShowJobModal(false)} size="lg">
                    <Modal.Header closeButton style={{ backgroundColor: '#007bff', color: '#fff' }}>
                        <Modal.Title>Job Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedJob && (
                            <div>
                                <h4 className="mb-3 text-primary">{selectedJob.jobTitle}</h4>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <strong>Category:</strong>
                                        <p>{selectedJob.categoryType}</p>
                                    </Col>
                                </Row>

                                <strong>Description:</strong>
                                <p>{selectedJob.description || selectedJob.description}</p>

                                <hr />

                                <h5 className="text-primary mt-4">Location</h5>
                                <Row>
                                    <Col md={6}>
                                        <strong>Street:</strong>
                                        <p>{selectedJob.streetName}</p>
                                    </Col>
                                    <Col md={6}>
                                        <strong>City:</strong>
                                        <p>{selectedJob.city}</p>
                                    </Col>
                                    <Col md={6}>
                                        <strong>Province:</strong>
                                        <p>{selectedJob.province}</p>
                                    </Col>
                                    <Col md={6}>
                                        <strong>Postal Code:</strong>
                                        <p>{selectedJob.postalCode}</p>
                                    </Col>
                                </Row>

                                <hr />

                                <h5 className="text-primary mt-4">Salary</h5>
                                <p>
                                    <FaMoneyBillWave className="me-2" />
                                    R{selectedJob.salary} {selectedJob.salaryType}
                                </p>

                                <strong>Application Deadline:</strong>
                                <p>{new Date(selectedJob.deadline).toLocaleDateString()}</p>

                                <hr />
                            </div>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Edit job modal */}
                {selectedJob && (
                    <EditJobModal  //EditModal.js
                        show={showModal}
                        onHide={handleCloseModal}
                        jobData={selectedJob}  // Pass the selected job data to the modal, and modal handles form saving
                    />
                )}

                {/* Delete job modal */}
                {selectedJob && (
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                        <Modal.Header closeButton style={{ backgroundColor: '#dc3545', color: '#fff' }}>
                            <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Are you sure you want to delete the job <strong>"{selectedJob.title}"</strong>?
                            </p>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={()  => handleConfirmDelete(selectedJob)}> 
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default ManageJobsPage;
