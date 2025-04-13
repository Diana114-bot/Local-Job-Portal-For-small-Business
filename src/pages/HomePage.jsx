import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, People, BarChart, CheckCircle } from 'react-bootstrap-icons';
import homepic from '../assets/images/homepic.png';
import TopNavbar from "../components/TopNavbar";
import CTAButtons from "../components/CTAButtons";



const HomePage = () => {
  const features = [
    { icon: <Briefcase size={40} />, title: "Job Listings", text: "Find thousands of local job opportunities" },
    { icon: <People size={40} />, title: "Employer Network", text: "Connect with small businesses directly" },
    { icon: <CheckCircle size={40} />, title: "Easy Apply", text: "One-click application process" },
    { icon: <BarChart size={40} />, title: "Career Insights", text: "Local market analytics and trends" },
  ];

  return (
    <div className="homepage">
     <TopNavbar title="JobConnect" showLogin={true} />



      
      <section className="hero-section py-5 text-white" style={{ background: "linear-gradient(to right, #0d6efd, #2563eb)" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <h1 className="display-5 fw-bold mb-3">Find Local Jobs in Your Community</h1>
              <p className="lead mb-4">Connect small businesses with talented professionals in your area</p>
              <div className="input-group shadow-lg rounded overflow-hidden">
                <input 
                  type="text" 
                  className="form-control form-control-lg border-0" 
                  placeholder="e.g. Cashier, Driver, Sales Assistant" 
                />
                <button className="btn btn-light btn-lg px-4">
                  <Search className="me-2" />Search Jobs
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="image-overlay-container position-relative rounded-4 shadow-lg overflow-hidden">
                <div className="blue-overlay position-absolute top-0 start-0 w-100 h-100"></div>
                <img 
                  src={homepic} 
                  alt="Job search illustration" 
                  className="img-fluid position-relative" 
                  style={{ zIndex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose JobConnect?</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="card h-100 border-0 shadow-sm text-center p-4 rounded-4 hover-shadow">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h3 className="h5">{feature.title}</h3>
                  <p className="text-muted">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="how-step bg-white rounded-4 shadow-sm p-4 h-100 hover-lift">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  1
                </div>
                <h5 className="fw-semibold">Create Profile</h5>
                <p className="text-muted">Build your professional profile in minutes</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="how-step bg-white rounded-4 shadow-sm p-4 h-100 hover-lift">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  2
                </div>
                <h5 className="fw-semibold">Search Jobs</h5>
                <p className="text-muted">Find the best opportunities in your local area</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="how-step bg-white rounded-4 shadow-sm p-4 h-100 hover-lift">
                <div className="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  3
                </div>
                <h5 className="fw-semibold">Apply Easily</h5>
                <p className="text-muted">Send your application with just one click</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start Your Journey?</h2>
          <CTAButtons />
         
          
        </div>
      </section>
    </div>
  );
};

export default HomePage;
