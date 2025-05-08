// src/admin/components/AdminTopbar.js
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

export default function AdminTopbar() {
  const auth = getAuth();
  const user = auth.currentUser;
  
  // Extract name from email
  const getName = () => {
    if (!user?.email) return 'Admin';
    const username = user.email.split('@')[0];
    return username.charAt(0).toUpperCase() + username.slice(1);
  };

  // Get first letter for avatar
  const getInitial = () => getName().charAt(0).toUpperCase();

  return (
    <nav className="admin-topbar">
      <div className="header-content">
        <h1 className="dashboard-title">
          <span className="greeting">Welcome back,</span>
          <span className="username">{getName()}</span>
        </h1>
        
        <div className="topbar-right">
          <Link to="/admin/notifications" className="notification-icon">
            <FiBell className="icon" />
            <span className="badge">3</span> {/* Dynamic count */}
          </Link>
          
          <div className="profile-section">
            <div className="avatar yellow-bg">{getInitial()}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}