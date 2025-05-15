import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, LogOut } from 'react-feather';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";

const MyJobsPage = () => {
    const [username, setUsername] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);

    const navigate = useNavigate();
    const { logout } = useAuth();

    // Fetch jobs from Firebase Firestore filtering by current user email and include job details using jobId
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const user = auth.currentUser;
                if (!user?.email) return;

                const db = getFirestore();
                const appQuery = query(collection(db, "applications"), where("userEmail", "==", user.email));
                const querySnapshot = await getDocs(appQuery);

                const jobsData = await Promise.all(
                    querySnapshot.docs.map(async (docSnap) => {
                        const appData = docSnap.data(); // Data from the "applications" collection
                        let jobData = {};

                        if (appData.jobId) {
                            const jobDocRef = doc(db, "jobs", appData.jobId);
                            const jobDocSnap = await getDoc(jobDocRef);

                            if (jobDocSnap.exists()) {
                                jobData = jobDocSnap.data(); // Data from the "jobs" collection
                            }
                        }

                        // Combine all data from both collections
                        return {
                            id: docSnap.id, // Application document ID
                            ...appData, // Data from "applications"
                            ...jobData, // Data from "jobs"
                        };
                    })
                );

                setAppliedJobs(jobsData); // Store the combined data in state
            } catch (error) {
                console.error("Error fetching jobs:", error.message);
            }
        };

        fetchJobs();
    }, []);

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

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'badge bg-warning text-dark';
            case 'Accepted':
                return 'badge bg-success';
            case 'Rejected':
                return 'badge bg-danger';
            default:
                return 'badge bg-secondary';
        }
    };

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
            {/* Main Content */}
            <div className="main-content">
                <div className="btn-group mb-4" role="group">
                    <h5 className="mb-0 fw-semibold">Job Applications</h5>
                </div>

                {/* Applied Jobs Content */}
                <div className="row">
                    {appliedJobs.map((job) => (
                        <div className="col-md-6 mb-4" key={job.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{job.jobTitle}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">
                                        {job.recruiterCompanyName}
                                    </h6>

                                    <p className="card-text mb-1">
                                        <strong>Posted on:</strong>{" "}
                                        {job.appliedAt && job.appliedAt.toDate().toLocaleDateString()}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Category:</strong> {job.categoryType}
                                    </p>
                                    <p className="card-text mb-2">
                                        <strong>Status:</strong>{" "}
                                        <span className={getStatusBadgeClass(job.status || 'Pending')}>
                                            {job.status || 'Pending'}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm btn-outline-primary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyJobsPage;

