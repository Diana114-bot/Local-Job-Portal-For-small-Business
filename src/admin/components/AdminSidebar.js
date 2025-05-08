// src/admin/components/AdminSidebar.js
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiBriefcase, FiBarChart, 
  FiSettings, FiLogOut, FiMenu, FiChevronLeft,
  FiAlertOctagon, FiClock, FiCheckCircle, FiActivity, FiBell
} from 'react-icons/fi';

export default function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className={`admin-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <button 
          className="toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <FiChevronLeft /> : <FiMenu />}
        </button>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="menu-item">
              <FiHome className="menu-icon" />
              {isExpanded && <span>Dashboard</span>}
            </NavLink>
          </li>

          {/* Users Section */}
          <li className="menu-group">
            <div className="submenu-header" onClick={() => toggleSubmenu('users')}>
              <FiUsers className="menu-icon" />
              {isExpanded && (
                <>
                  <span>Users</span>
                  <span className={`submenu-arrow ${openSubmenu === 'users' ? 'open' : ''}`}>
                    ▼
                  </span>
                </>
              )}
            </div>
            {openSubmenu === 'users' && isExpanded && (
              <ul className="submenu">
                <li>
                  <NavLink to="/admin/users/all" className="submenu-item">
                    All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users/pending" className="submenu-item">
                    <FiCheckCircle className="submenu-icon" />
                    Pending Verifications
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/users/activity-logs" className="submenu-item">
                    <FiActivity className="submenu-icon" />
                    Activity Logs
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Jobs Section */}
          <li className="menu-group">
            <div className="submenu-header" onClick={() => toggleSubmenu('jobs')}>
              <FiBriefcase className="menu-icon" />
              {isExpanded && (
                <>
                  <span>Jobs</span>
                  <span className={`submenu-arrow ${openSubmenu === 'jobs' ? 'open' : ''}`}>
                    ▼
                  </span>
                </>
              )}
            </div>
            {openSubmenu === 'jobs' && isExpanded && (
              <ul className="submenu">
                <li>
                  <NavLink to="/admin/jobs/active" className="submenu-item">
                    Active Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/jobs/flagged" className="submenu-item">
                    <FiAlertOctagon className="submenu-icon" />
                    Flagged Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/jobs/expired" className="submenu-item">
                    <FiClock className="submenu-icon" />
                    Expired Jobs
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Analytics Section */}
          <li className="menu-group">
            <div className="submenu-header" onClick={() => toggleSubmenu('analytics')}>
              <FiBarChart className="menu-icon" />
              {isExpanded && (
                <>
                  <span>Analytics</span>
                  <span className={`submenu-arrow ${openSubmenu === 'analytics' ? 'open' : ''}`}>
                    ▼
                  </span>
                </>
              )}
            </div>
            {openSubmenu === 'analytics' && isExpanded && (
              <ul className="submenu">
                <li>
                  <NavLink to="/admin/analytics/overview" className="submenu-item">
                    Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/analytics/insights" className="submenu-item">
                    Recruitment Insights
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Notifications */}
          <li>
            <NavLink to="/admin/notifications" className="menu-item">
              <FiBell className="menu-icon" />
              {isExpanded && <span>Notifications</span>}
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink to="/admin/settings" className="menu-item">
              <FiSettings className="menu-icon" />
              {isExpanded && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FiLogOut className="icon" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}