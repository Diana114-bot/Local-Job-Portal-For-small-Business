import React, { useState } from 'react';
import { List, HouseDoor, Briefcase, People, Gear, BoxArrowRight, Person, Building, Envelope, Phone, Facebook } from 'react-bootstrap-icons';
import { SiTiktok } from 'react-icons/si';
import { MdBusiness } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Card, Button, Alert, Form } from 'react-bootstrap';

// Import Firestore functions from Firebase SDK
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config should be initialized in a separate file 
// (for example, firebaseConfig.js) that you import here.
const db = getFirestore();

const EmployerSidebar = ({ collapsed, toggleSidebar }) => {
    return (
        <div className={`bg-white shadow-sm p-3 d-flex flex-column ${collapsed ? 'align-items-center' : ''}`}
            style={{ minHeight: '100vh', width: collapsed ? '80px' : '250px', transition: '0.3s' }}>
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
                    <Link to="/employer/profile" className="text-decoration-none text-dark d-flex align-items-center">
                        <Person className="me-2" /> {!collapsed && 'Profile'}
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

const ProfilePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const auth = getAuth();
    const currentUserEmail = auth.currentUser ? auth.currentUser.email : "email@incident.com";
    const [profileData, setProfileData] = useState({
        email: currentUserEmail,
        phone: "0 123 455 7890",
        business_name: "Mamzo spaza shop",
        about: `Spare control gives working on things on Wifi Store. Full satisfaction buttons running in length on Wifi Store.
                Messages a small team buying and selling Page sticks for farmers. Spare control gives learning lessons to Work Plus Books, FL.
                Download control over methods for working in lengths in the alternated. Start a workload reporting laptops in Work Plus Books,
                FL in this position. An Software Engineer collaborates with Deviation Development team to continuously enhance our current
                software solutions as well as create new solutions to enhance the best-fifteen operations and management challenges present.`,
        facebook: "www.facebook.com/meetime",
        tiktok: "TikTok profile",
        city: "Soshanguve",
        streetName: "49 Namen Street",
        province: "Gauteng",
        postalCode: "0183",
    });

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleEditMode = () => setEditMode(!editMode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "employerProfiles", profileData.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // Update the existing document
                await updateDoc(docRef, profileData);
            } else {
                // Create a new document
                await setDoc(docRef, profileData);
            }
            setSubmitted(true);
            setEditMode(false);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error("Error saving employer profile:", error);
        }
    };

    return (
        <div className="d-flex">
            <EmployerSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
                <Card className="shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
                    <Card.Body>
                        <div className="text-center mb-4">
                            <Building size={40} className="text-primary mb-3" />
                            <h2>Employer Profile</h2>
                        </div>

                        {submitted && <Alert variant="success" className="text-center">Profile updated successfully!</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <section className="mb-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    {!editMode && (
                                        <Button variant="primary" onClick={toggleEditMode}>
                                            Edit Profile
                                        </Button>
                                    )}
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <h5 className="text-primary">Business Information</h5>
                                        {editMode ? (
                                            <>
                                                <Form.Group>
                                                    <Form.Label>Business Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="business_name"
                                                        value={profileData.business_name}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        value={profileData.email}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Phone</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        name="phone"
                                                        value={profileData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <ul className="list-unstyled">
                                                <li><MdBusiness className="me-2" /> {profileData.business_name}</li>
                                                <li><Envelope className="me-2" /> {profileData.email}</li>
                                                <li><Phone className="me-2" /> {profileData.phone}</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>

                            </section>

                            <section className="mb-5">
                                <h5 className="text-primary mb-3">About Business</h5>
                                {editMode ? (
                                    <Form.Control
                                        as="textarea"
                                        name="about"
                                        value={profileData.about}
                                        onChange={handleChange}
                                        rows={6}
                                    />
                                ) : (
                                    <p className="whitespace-pre-line">{profileData.about}</p>
                                )}
                            </section>

                            <section className="mb-5">
                                <h5 className="text-primary mb-3">Social Network</h5>
                                {editMode ? (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Facebook</Form.Label>
                                            <Form.Control
                                                type="url"
                                                name="facebook"
                                                value={profileData.facebook}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>TikTok</Form.Label>
                                            <Form.Control
                                                type="url"
                                                name="tiktok"
                                                value={profileData.tiktok}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </>
                                ) : (
                                    <ul className="list-unstyled">
                                        <li><Facebook className="me-2" /> {profileData.facebook}</li>
                                        <li><SiTiktok className="me-2" /> {profileData.tiktok}</li>
                                    </ul>
                                )}
                            </section>

                            <section className="mb-5">
                                <h5 className="text-primary mb-3">Location</h5>
                                {editMode ? (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={profileData.city}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Postal Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="postalCode"
                                                value={profileData.postalCode}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Province</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="province"
                                                value={profileData.province}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Street Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="streetName"
                                                value={profileData.streetName}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </>
                                ) : (
                                    <ul className="list-unstyled">
                                        <li><strong>Province:</strong> {profileData.province}</li>
                                        <li><strong>Address:</strong> {profileData.streetName}, {profileData.postalCode}, {profileData.city}</li>
                                    </ul>
                                )}
                            </section>

                            {editMode && (
                                <div className="d-flex gap-2">
                                    <Button variant="primary" type="submit" className="flex-grow-1">
                                        Save Changes
                                    </Button>
                                    <Button variant="outline-secondary" onClick={toggleEditMode} className="flex-grow-1">
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;