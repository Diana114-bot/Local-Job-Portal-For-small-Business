import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBell, FiLogOut } from 'react-icons/fi';

const TopNavbar = ({ onLogout }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/profile');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 border-bottom shadow-sm">
      <div className="container-fluid">
        {/* Changed: Replaced HireZone with italic Thanix */}
        <Link to="/" className="navbar-brand fw-bold text-primary" style={{ fontStyle: 'italic' }}>
          Thanix
        </Link>

        <div className="d-flex align-items-center ms-auto">
          {isDashboard ? (
            <>
              <span className="me-3 text-muted small d-none d-md-inline">
                {currentUser?.email}
              </span>
              <button className="btn btn-light me-2">
                <FiBell />
              </button>
              <button className="btn btn-outline-danger" onClick={onLogout}>
                <FiLogOut className="me-1" /> Logout
              </button>
            </>
          ) : (
            // Removed login button 
            null
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;