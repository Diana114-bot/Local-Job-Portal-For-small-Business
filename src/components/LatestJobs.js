// src/components/LatestJobs.js
import React from "react";
import { BriefcaseFill, GeoAlt, Building } from "react-bootstrap-icons";

const jobs = [
  {
    id: 1,
    title: "Front-End Developer",
    company: "TechNova",
    location: "Polokwane, Limpopo",
  },
  {
    id: 2,
    title: "Graphic Designer",
    company: "Local Creatives",
    location: "Soshanguve, Gauteng",
  },
  {
    id: 3,
    title: "Admin Assistant",
    company: "SmallBiz Hub",
    location: "Tembisa, Gauteng",
  },
];

const LatestJobs = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Latest Job Listings</h2>
        <p className="text-center text-muted mb-5">Browse recent opportunities posted by local employers.</p>

        <div className="row g-4">
          {jobs.map((job) => (
            <div className="col-md-6 col-lg-4" key={job.id}>
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-shadow">
                <h5 className="mb-2 text-primary">
                  <BriefcaseFill className="me-2" /> {job.title}
                </h5>
                <p className="mb-1 text-muted"><Building className="me-1" /> {job.company}</p>
                <p className="mb-3 text-muted"><GeoAlt className="me-1" /> {job.location}</p>
                <button className="btn btn-outline-primary w-100">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
