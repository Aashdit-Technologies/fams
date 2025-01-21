import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AdminMain from '../AdminMain/AdminMain';
import DashBoard from '../DashBoard';
import './Admin.css';

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  

  return (
    <div className="admin-layout">
      <Header collapsed={collapsed} />
      <div className={`parent-container ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminMain collapsed={collapsed}>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            {/* <Route path="/users" element={<Users />} /> */}
          </Routes>
        </AdminMain>
      </div>
    </div>
  );
};

export default Admin;