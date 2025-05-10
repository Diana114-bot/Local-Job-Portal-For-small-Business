import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, LogOut } from 'react-feather';
import { Button } from 'react-bootstrap';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';
import { getFirestore, collection, getDocs, query, where, addDoc } from "firebase/firestore";

const MyJobsPage = () => {
  const [username, setUsername] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);

  const navigate = useNavigate();
  const { logout } = useAuth();

  // Fetch jobs from Firebase Firestore
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppliedJobs(jobsData);
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
  const handleApply = async (job) => {
    try {
      const db = getFirestore();
      const user = auth.currentUser;
      if (!user?.email) {
        console.error("User not authenticated");
        return;
      }
      // Check if the user has already applied for this job
      const existingApplications = await getDocs(
        query(collection(db, "applications"), where("userEmail", "==", user.email), where("jobId", "==", job.id))
      );
      if (!existingApplications.empty) {
        window.alert("You have already applied for this job.");
        return;
      }
      //confirming the application
      const confirmation = window.confirm(`Are you sure you want to apply for ${job.jobTitle}?`);
      await addDoc(collection(db, "applications"), {
        jobId: job.id,
        jobTitle: job.jobTitle,
        userEmail: user.email,
        companyEmail: job.recruiterEmail, // Ensure the job document has this field
        appliedAt: new Date(),
        streetName: job.streetName // added field
      });
      confirmation && 
      window.alert("Application submitted successfully.");
    } catch (error) {
      window.alert("Error applying for job:", error.message);
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
                  <h6 className="card-subtitle mb-2 text-muted">{job.recruiterCompanyName}</h6>
                  <p className="card-text mb-1">
                    <strong>Posted on:</strong> {job.createdAt && job.createdAt.toDate().toLocaleDateString()}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Category:</strong> {job.categoryType}
                  </p>
                  <p className="card-text mb-2">
                    <strong>Salary:</strong>{' '}
                    <span className={getStatusBadgeClass(job.salary)}>
                      R {job.salary} {job.salaryType}
                    </span>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-primary">View Details</button>
                    <button className="btn btn-sm btn-primary" onClick={() => handleApply(job)}>
                      Apply Now
                    </button>
                  </div>
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
