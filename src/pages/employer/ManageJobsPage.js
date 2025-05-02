import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight, CheckCircle,Person } from 'react-bootstrap-icons';
import { FaEye, FaEdit, FaTrash,FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


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
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);

    const [search, setSearch] = useState('');
    const jobs = [
        {
            title: 'General Ledger Accountant',
            location: 'RG40, Wokingham',
            created: 'Dec 03, 2017',
            expiry: 'Oct 22, 2018',
            applications: 17,
            status: 'Inactive',
        },
        {
            title: 'Car Financed Required For Bank',
            location: 'London, United Kingdom',
            created: 'Dec 03, 2017',
            expiry: 'Oct 22, 2018',
            applications: 14,
            status: 'Active',
        },
        {
            title: 'UX/UI Designer',
            location: 'RG40, Wokingham',
            created: 'Dec 03, 2017',
            expiry: 'Oct 22, 2018',
            applications: 5,
            status: 'Active',
        },
    ];

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
    );

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
                            {filteredJobs.map((job, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <strong>{job.title}</strong>
                                        <br />
                                        <small className="text-muted">{job.location}</small>
                                        <br />
                                        <small className="text-secondary">
                                            Created: {job.created} | Expiry: {job.expiry}
                                        </small>
                                    </td>
                                    <td>{job.applications}</td>
                                    <td>
                                        <span className={`badge ${job.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary me-2">
                                            <FaEye />
                                        </button>
                                        <button className="btn btn-sm btn-outline-success me-2">
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageJobsPage;
