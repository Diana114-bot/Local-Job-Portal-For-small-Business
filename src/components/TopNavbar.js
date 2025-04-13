import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ title = "JobConnect", showLogin = false }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(showLogin ? "/login" : "/login"); // both go to login, but you could separate them if needed
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
      <h4 className="m-0 fw-bold">{title}</h4>
      {showLogin ? (
        <button className="btn btn-outline-primary btn-sm" onClick={handleNavigate}>
          Login
        </button>
      ) : (
        <button className="btn btn-outline-danger btn-sm" onClick={handleNavigate}>
          <LogOut size={16} className="me-1" />
          Logout
        </button>
      )}
    </div>
  );
};

export default TopNavbar;
