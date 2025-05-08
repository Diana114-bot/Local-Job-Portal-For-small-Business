import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Collapse, Badge } from 'react-bootstrap';
import { Search, Sliders, DollarSign, Briefcase, Clock, MapPin } from 'react-feather';

const JobSearchPage = () => {
  // State initialization
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState({
    jobType: [],
    salaryRange: [0, 50000],
    experienceLevel: '',
    datePosted: 'any'
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Enhanced mock data with correct experience levels
  const mockJobs = [
    {
      id: 1,
      title: "Retail Assistant",
      company: "Local Market",
      location: "Cape Town CBD",
      salary: 15000,
      type: "Part-time",
      posted: "2h ago",
      experience: "entry" // Changed to lowercase
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "Quick Logistics",
      location: "10km from you",
      salary: 18000,
      type: "Contract",
      posted: "1d ago",
      experience: "mid" // Changed to lowercase
    }
  ];

  // Debugging function
  const logSearchCriteria = () => {
    console.log('Current Search Criteria:', {
      searchTerm,
      location,
      filters
    });
    console.log('Mock Jobs:', mockJobs);
  };

  // Search handler with debug logs
  const handleSearch = (e) => {
    e.preventDefault();
    logSearchCriteria(); // Debug current state
    
    const results = mockJobs.filter(job => {
      // 1. Search term matching
      const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const companyMatch = job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const searchMatch = titleMatch || companyMatch;
      
      // 2. Location matching
      const locationMatch = job.location.toLowerCase().includes(location.toLowerCase());
      
      // 3. Job type matching
      const typeMatch = filters.jobType.length === 0 || 
                       filters.jobType.includes(job.type);
      
      // 4. Salary range matching
      const salaryMatch = job.salary >= filters.salaryRange[0] && 
                        job.salary <= filters.salaryRange[1];
      
      // 5. Experience level matching
      const experienceMatch = !filters.experienceLevel || 
                            job.experience === filters.experienceLevel;

      console.log(`Job ${job.id} matches:`, {
        searchMatch,
        locationMatch,
        typeMatch,
        salaryMatch,
        experienceMatch
      });

      return searchMatch && locationMatch && typeMatch && salaryMatch && experienceMatch;
    });

    console.log('Filter Results:', results);
    setFilteredJobs(results);
  };

  // Initial load debug
  useEffect(() => {
    console.log('Component mounted - Initial filteredJobs:', filteredJobs);
  }, []);

  // Format salary display
  const formatSalary = (salary) => {
    return `R${salary.toLocaleString()}/month`;
  };

  return (
    <div className="job-search-container p-4">
      {/* Search Header */}
      <div className="search-header mb-4">
        <h3 className="mb-3">
          <Search size={24} className="me-2" />
          Find Local Jobs in Your Community
        </h3>
      </div>

      {/* Search Form */}
      <Form onSubmit={handleSearch}>
        <div className="search-bar bg-white p-3 rounded shadow-sm mb-4">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={18} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Job title or keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="search-input"
                />
              </div>
            </div>
            
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text">
                  <MapPin size={18} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  data-testid="location-input"
                />
              </div>
            </div>

            <div className="col-md-2">
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                data-testid="search-button"
              >
                Q Search Jobs
              </Button>
            </div>
          </div>
        </div>

        {/* ... (rest of the component remains the same) */}
      </Form>

      {/* Debug Section */}
      <div className="debug-output mt-4 p-3 bg-light rounded">
        <h5>Debug Information</h5>
        <pre>
          Current Search Term: {searchTerm}<br />
          Current Location: {location}<br />
          Active Filters: {JSON.stringify(filters, null, 2)}<br />
          Results Found: {filteredJobs.length}
        </pre>
      </div>
    </div>
  );
};

export default JobSearchPage;