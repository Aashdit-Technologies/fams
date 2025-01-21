import React from 'react'
import './AdminMain.css'

const AdminMain = ({ collapsed, children }) => {
  return (
    <div className={`admin-main ${collapsed ? 'collapsed' : ''}`}>
      <div classNsame="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMain