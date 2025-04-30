import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed unused imports
import { auth, firestore, logout } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../assets/dashboard.css';

const MyJobsPage = () => {
  const [username, setUsername] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  // Removed unused state variables
 

  // Example function to add a new job with auto-incremented id

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

  const fetchApplications = async () => {
    try {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        console.error('No user is logged in.');
        return;
      }

      const applicationsCollectionRef = collection(firestore, 'applications');
      const q = query(applicationsCollectionRef, where('userEmail', '==', user.email)); // Query applications with the current user's email
      const applicationsSnapshot = await getDocs(q);

      const applicationsList = applicationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Fetched Applications:', applicationsList);
      setAppliedJobs(applicationsList); // Assuming you have a state variable for applied jobs
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

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
    fetchApplications(); // Fetch applications when the component mounts
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="btn-group mb-4" role="group">
        <h5 className="mb-0 fw-semibold"> Applications</h5>
      </div>

      {/* Applied Jobs Content */}
      <div className="row">
        {appliedJobs.map((job) => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">
                  <span className={getStatusBadgeClass(job.status)}>
                    {job.status}
                  </span>
                </p>
                <button className="btn btn-sm btn-outline-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobsPage;
