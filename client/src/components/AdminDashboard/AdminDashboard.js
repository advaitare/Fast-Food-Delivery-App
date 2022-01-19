import React from 'react';
import { isAuthenticated } from '../../helpers/authFetch';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { name, email, role, _id }
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card bg-g borderStyle">
        <h4 className="card-header">Admin Control</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Your profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create new Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create New Item
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/categories">
              Manage existing Categories
            </Link>
          </li>

          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage existing Items
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View all Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5 bg-g borderStyle">
        <h3 className="card-header">Profile</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
          
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <div >{adminLinks()}</div>
      
    </div>
  );
};

export default AdminDashboard;
