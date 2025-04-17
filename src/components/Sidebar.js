import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'profile', label: 'Profile' },
    { key: 'jobs', label: 'My Jobs' },
    { key: 'settings', label: 'Settings' },
  ];

  return (
    <div className="sidebar bg-primary text-white d-flex flex-column p-3" style={{ width: '250px', minHeight: '100vh' }}>
      <h4 className="mb-4">LocalHireZone</h4>
      {navItems.map(({ key, label }) => (
        <button
          key={key}
          className={`btn text-white text-start mb-2 ${activeTab === key ? 'fw-bold' : ''}`}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
