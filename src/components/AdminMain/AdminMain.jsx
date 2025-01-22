import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import './AdminMain.css';

const AdminMain = ({ collapsed }) => {
  return (
    <div className={`admin-main ${collapsed ? 'collapsed' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminMain.propTypes = {
  collapsed: PropTypes.bool
};

AdminMain.defaultProps = {
  collapsed: false
};

export default AdminMain;