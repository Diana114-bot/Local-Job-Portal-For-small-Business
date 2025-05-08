// src/admin/pages/AdminDashboard.js
import { FiUsers, FiBriefcase, FiActivity, FiDollarSign } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', users: 45, jobs: 32 },
  { name: 'Feb', users: 52, jobs: 41 },
  { name: 'Mar', users: 68, jobs: 55 },
  { name: 'Apr', users: 82, jobs: 63 },
  { name: 'May', users: 94, jobs: 72 },
];

const recentActivities = [
  { id: 1, type: 'user', title: 'New user registered', time: '5 min ago' },
  { id: 2, type: 'job', title: 'Job "Web Developer" posted', time: '2 hours ago' },
  { id: 3, type: 'application', title: '15 new applications received', time: '4 hours ago' },
];

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Stats Overview */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats-card bg-primary text-white">
            <FiUsers className="stats-icon" />
            <h3>1,234</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats-card bg-success text-white">
            <FiBriefcase className="stats-icon" />
            <h3>289</h3>
            <p>Active Jobs</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats-card bg-warning text-white">
            <FiActivity className="stats-icon" />
            <h3>634</h3>
            <p>Applications</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats-card bg-info text-white">
            <FiDollarSign className="stats-icon" />
            <h3>$12,450</h3>
            <p>Revenue</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="chart-container">
            <h4>User Growth</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="col-12 col-lg-4">
          <div className="chart-container">
            <h4>Job Categories</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="jobs" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="recent-activities">
        <h4>Recent Activities</h4>
        <div className="activity-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'user' && <FiUsers />}
                {activity.type === 'job' && <FiBriefcase />}
                {activity.type === 'application' && <FiActivity />}
              </div>
              <div className="activity-content">
                <h6>{activity.title}</h6>
                <small>{activity.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}