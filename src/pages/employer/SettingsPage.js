import { Link } from 'react-router-dom';
import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight } from 'react-bootstrap-icons';
import React, { useState } from 'react';
import { BellRing, Shield, SlidersHorizontal, User } from 'lucide-react';

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

const SettingsPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);
    const [activeTab, setActiveTab] = useState('notifications');
    const [userEmail, setEmail] = useState('alex.assenmacher@gmail.com');

    return (
        <div className="d-flex">
            <EmployerSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div className="main-content" style={{ flex: 1 }}>
                <div className="d-flex flex-grow-1" style={{ overflow: 'auto' }}>
                    {/* Tab List */}
                    <div className="bg-white border-end" style={{ minWidth: '220px', position: 'sticky', top: '0' }}>
                        <ul className="list-group rounded-0 border-0">
                            {[
                                { key: 'notifications', label: 'Notifications', icon: <BellRing size={18} /> },
                                { key: 'communication', label: 'Communication', icon: <SlidersHorizontal size={18} /> },
                                { key: 'applications', label: 'Application Management', icon: <People size={18} /> },
                                { key: 'account', label: 'Security', icon: <Shield size={18} /> },
                            ].map(({ key, label, icon }) => (
                                <li
                                    key={key}
                                    className={`list-group-item d-flex align-items-center gap-2 fw-semibold`}
                                    onClick={() => setActiveTab(key)}
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        backgroundColor: activeTab === key ? '#f0f4ff' : 'transparent',
                                        borderLeft: activeTab === key ? '4px solid #0d6efd' : '4px solid transparent',
                                        color: activeTab === key ? '#0d6efd' : '#000',
                                    }}
                                >
                                    {icon}
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 flex-grow-1">
                        <h5 className="fw-semibold mb-3">{activeTab === 'notifications' && 'Notification Settings'}</h5>
                        <h5 className="fw-semibold mb-3">{activeTab === 'communication' && 'Communication Settings'}</h5>
                        <h5 className="fw-semibold mb-3">{activeTab === 'applications' && 'Application Management Settings'}</h5>
                        <h5 className="fw-semibold mb-3">{activeTab === 'account' && 'Account & Security Settings'}</h5>

                        {/* Notification Settings Tab */}
                        {activeTab === 'notifications' && (
                            <div className="mt-3">
                                <h6 className="fw-semibold mb-3">Email Notifications</h6>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="newCandidate"
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="newCandidate">New candidate applies</label>
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="candidateResponse"
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="candidateView">Candidate views application</label>
                                </div>

                                <h6 className="fw-semibold mb-3">Preferred Email Address</h6>
                                <input type="email" className="form-control" value={userEmail} onChange={(e) => setEmail(e.target.value)} />

                                <h6 className="fw-semibold mb-3">Notification Frequency</h6>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="notificationFrequency" id="instant" />
                                    <label className="form-check-label fw-medium" htmlFor="instant">Instant</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="notificationFrequency" id="daily" />
                                    <label className="form-check-label fw-medium" htmlFor="daily">Daily Summary</label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="radio" name="notificationFrequency" id="weekly" />
                                    <label className="form-check-label fw-medium" htmlFor="weekly">Weekly Summary</label>
                                </div>
                            </div>
                        )}

                        {/* Communication Settings Tab */}
                        {activeTab === 'communication' && (
                            <div className="mt-3">
                                <h6 className="fw-semibold mb-3">Email Template</h6>
                                <textarea className="form-control" rows="4" placeholder="Write default email template here"></textarea>

                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="enableReplies"
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="enableReplies">Enable email replies from candidates</label>
                                </div>

                                <h6 className="fw-semibold mb-3">Message Signature</h6>
                                <textarea className="form-control" rows="3" placeholder="Default signature or greeting text"></textarea>

                                <h6 className="fw-semibold mb-3">Auto-Response for Initial Application</h6>
                                <textarea className="form-control" rows="3" placeholder="E.g., 'Thanks for applying!'"></textarea>
                            </div>
                        )}

                        {/* Application Management Settings Tab */}
                        {activeTab === 'applications' && (
                            <div className="mt-3">
                                
                                
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="resumePDF"
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="resumePDF">Enable PDF resume downloads</label>
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="resumeDOCX"
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="resumeDOCX">Enable DOCX resume downloads</label>
                                </div>

                                <h6 className="fw-semibold mb-3">Bulk Actions</h6>
                                <button className="btn btn-primary btn-sm me-2">Download All Resumes</button>
                                <button className="btn btn-primary btn-sm">Send Mass Messages</button>

                                <h6 className="fw-semibold mb-3">Tagging/Notes</h6>
                                <textarea className="form-control" rows="3" placeholder="Add notes or tags to applications"></textarea>
                            </div>
                        )}

                        {/* Account & Security Settings Tab */}
                        {activeTab === 'account' && (
                            <div className="mt-3">
                                <h6 className="fw-semibold">Change Password</h6>
                                <div className="d-flex gap-2 flex-wrap">
                                    <input type="password" className="form-control" placeholder="New Password" style={{ maxWidth: '300px' }} />
                                    <button className="btn btn-outline-secondary btn-sm">Update</button>
                                </div>

                                <h6 className="d-flex gap-2 flex-wrap">Delete or Deactivate Account</h6>
                                <p className="text-muted">This will permanently or temporarily disable your account.</p>
                                <button className="btn btn-warning btn-sm">Deactivate</button>
                                <button className="btn btn-danger btn-sm ms-2">Delete Account</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
