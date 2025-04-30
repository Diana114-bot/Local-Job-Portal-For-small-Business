import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, BarChart, Bell, Briefcase, User, LogOut } from 'react-feather';
import { BellRing, Shield, SlidersHorizontal } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';

const Settings = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [activeTab, setActiveTab] = useState('profile');
    const [twoStepEnabled, setTwoStepEnabled] = useState(true);
    const [statusEnabled, setStatusEnabled] = useState(false);
    const [reviewEnabled, setReviewEnabled] = useState(false);
    const [promotionEnabled, setPromotionEnabled] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);
    const [userEmail, setEmail] = useState('alex.assenmacher@gmail.com');

    const tabTitles = {
        profile: 'Account',
        notifications: 'Notifications',
        security: 'Password & Security',
        preferences: 'Preferences',
    };
<<<<<<< HEAD

    const navigate = useNavigate();
    const { logout } = useAuth();

=======
    
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
    useEffect(() => {
        const user = auth.currentUser;
        if (user?.email) {
            const [namePart] = user.email.split('@');
            const formattedName = namePart
                .replace(/[^a-zA-Z]/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase())
                .trim();
            setUsername(formattedName);
        }
    }, []);

<<<<<<< HEAD
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h4>CareerConnect Pro</h4>
                </div>
                <nav className="nav flex-column">
                    <Button variant="link" className="nav-link active">
                        <BarChart className="me-2" size={18} />
                        Dashboard
                    </Button>
                    <Button variant="link" className="nav-link">
                        <User className="me-2" size={18} />
                        My Profile
                    </Button>
                    <Button variant="link" className="nav-link" onClick={() => navigate('/jobs')}>
                        <Briefcase className="me-2" size={18} />
                        My Applications
                    </Button>
                    <Button variant="link" className="nav-link" onClick={() => navigate('/settings')}>
                        <Bell className="me-2" size={18} />
                        Notifications
                    </Button>
                    <Button variant="outline-danger" onClick={handleLogout} className="m-3">
                        <LogOut size={18} className="me-2" />
                        Sign Out
                    </Button>
                </nav>
            </div>

=======
       
    return (
        <div className="dashboard-container">
>>>>>>> 7db86fd615d0191eef0beadb93485f85987fea69
            {/* Main Content */}
            <div className="main-content">
                <div className="d-flex flex-grow-1" style={{ overflow: 'auto' }}>
                    {/* Tab List */}
                    <div className="bg-white border-end" style={{ minWidth: '220px' }}>
                        <ul className="list-group rounded-0 border-0">
                            {[
                                { key: 'profile', label: 'Account', icon: <User size={18} /> },
                                { key: 'notifications', label: 'Notifications', icon: <BellRing size={18} /> },
                                { key: 'security', label: 'Password & Security', icon: <Shield size={18} /> },
                                { key: 'preferences', label: 'Preferences', icon: <SlidersHorizontal size={18} /> },
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
                        <h5 className="fw-semibold mb-3">{tabTitles[activeTab]}</h5>

                        {/* Account Tab */}
                        {activeTab === 'profile' && (
                            <div className="mt-3">
                                <div className="mb-4">
                                    <h6 className="fw-semibold">Email Address</h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        {editingEmail ? (
                                            <>
                                                <input
                                                    type="email"
                                                    className="form-control me-3"
                                                    value={userEmail}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{ maxWidth: '300px' }}
                                                />
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-success btn-sm" onClick={() => setEditingEmail(false)}>Save</button>
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditingEmail(false)}>Cancel</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <strong>{userEmail}</strong>
                                                    <span className="ms-2 text-danger">Unverified</span>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditingEmail(true)}>Edit</button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-semibold">Change Password</h6>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <input type="password" className="form-control" placeholder="New Password" style={{ maxWidth: '300px' }} />
                                        <button className="btn btn-outline-secondary btn-sm">Update</button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h6 className="fw-semibold">Linked Accounts</h6>
                                    <p className="text-muted">You can link your account with third-party services:</p>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-outline-dark btn-sm">Connect Google</button>
                                        <button className="btn btn-outline-primary btn-sm">Connect Facebook</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="mt-3">
                                <h6 className="fw-semibold mb-3">Email Notifications</h6>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="review"
                                        checked={reviewEnabled}
                                        onChange={() => setReviewEnabled(!reviewEnabled)}
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="review">Application review</label>
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="status"
                                        checked={statusEnabled}
                                        onChange={() => setStatusEnabled(!statusEnabled)}
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="status">Application Status</label>
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="promotion"
                                        checked={promotionEnabled}
                                        onChange={() => setPromotionEnabled(!promotionEnabled)}
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="promotion">Promotional emails</label>
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="mt-3">
                                <div className="form-check form-switch mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="2fa"
                                        checked={twoStepEnabled}
                                        onChange={() => setTwoStepEnabled(!twoStepEnabled)}
                                    />
                                    <label className="form-check-label fw-medium" htmlFor="2fa">
                                        Enable Two-Factor Authentication (2FA)
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <h6 className="fw-semibold text-warning">Deactivate My Account</h6>
                                    <p className="text-muted">This will temporarily disable your account.</p>
                                    <button className="btn btn-warning btn-sm">Deactivate</button>
                                </div>
                                <div className="mb-4">
                                    <h6 className="fw-semibold text-danger">Delete Account</h6>
                                    <p className="text-muted">This will permanently delete your account from JobConnect.</p>
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferences' && (
                            <div className="mt-3">
                                <div className="form-check form-switch mb-3">
                                    <input className="form-check-input" type="checkbox" id="darkMode" />
                                    <label className="form-check-label fw-medium" htmlFor="darkMode">Enable Dark Mode</label>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="language" className="form-label fw-medium">Language</label>
                                    <select className="form-select" id="language">
                                        <option>English</option>
                                        <option>Zulu</option>
                                        <option>Sotho</option>
                                        <option>French</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
