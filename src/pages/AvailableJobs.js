import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Table, Spinner, Alert } from 'react-bootstrap';

const AvailableJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  return (
    <div className="available-jobs-container mt-4">
      <h2 className="mb-4">Available Jobs</h2>
       {/* Applied Jobs Content */}
       <div className="row">
          {jobs.map(job => (
            <div className="col-md-6 mb-4" key={job.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title">{job.title}</h3>
                
                    <h5 className="card-text mb-1"><strong>Company:</strong> {job.companyName || 'N/A'}</h5>
                  <p className="card-text mb-1"><strong>Category:</strong> {job.salary}</p> {/* Added Category */}
                    <p className="card-text mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="card-text mb-1"><strong>Salary:</strong> {job.salary}</p>
                    <p className="card-text mb-1"><strong>Posted On:</strong> {new Date(job.createdAt.seconds * 1000).toLocaleDateString()}</p>



                  
                  <button className="btn btn-sm btn-outline-primary">Apply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AvailableJobs;