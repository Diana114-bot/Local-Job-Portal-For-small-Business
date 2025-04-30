import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for user info

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollectionRef = collection(firestore, 'jobs');
        const jobsSnapshot = await getDocs(jobsCollectionRef);
        const jobsList = jobsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (job) => {
    if (!currentUser) {
      setError('You must be logged in to apply for a job.');
      return;
    }

    try {
      const applicationsCollectionRef = collection(firestore, 'applications');
      await addDoc(applicationsCollectionRef, {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.companyName || 'N/A',
        appliedAt: new Date(),
      });
      setSuccessMessage(`Successfully applied for the job: ${job.title}`);
    } catch (err) {
      console.error('Error applying for job:', err);
      setError('Failed to apply for the job. Please try again later.');
    }
  };

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  return (
    <div className="available-jobs-container mt-4">
      <h2 className="mb-4">Available Jobs</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <div className="row">
        {jobs.map(job => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="card-title">{job.title}</h3>
                <h5 className="card-text mb-1"><strong>Company:</strong> {job.companyName || 'N/A'}</h5>
                <p className="card-text mb-1"><strong>Category:</strong> {job.category || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Location:</strong> {job.location || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Salary:</strong> {job.salary || 'N/A'}</p>
                <p className="card-text mb-1"><strong>Posted On:</strong> {new Date(job.createdAt.seconds * 1000).toLocaleDateString()}</p>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleApply(job)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableJobs;