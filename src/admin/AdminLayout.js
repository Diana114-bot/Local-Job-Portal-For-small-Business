// src/admin/pages/AdminLayout.js
import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import './admin.css'; 


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="main-content">
        <AdminTopbar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;