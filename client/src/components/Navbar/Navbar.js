import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../helpers/authFetch';
import { getItemTotal } from '../../helpers/cart';
import { LinkContainer} from 'react-router-bootstrap'
import {Image} from 'react-bootstrap'

const Navbar = ({ history }) => {
  const isActive = path => {
    if (history.location.pathname === path) {
      return { color: '#007bff' };
    } else {
      return { color: '#fff' };
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-dg f-black ">
      <Link className="navbar-brand" to="/">
      <Image src='/images/logoo.png' width="420"
                            height="120" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link" style={isActive('/')}>
              <i className="fa fa-home"></i>&nbsp;Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" style={isActive('/about')}>
              <i className="fa fa-info-circle"></i>&nbsp;About
            </Link>
          </li>
         
          <li className="nav-item">
            <Link to="/search" className="nav-link" style={isActive('/search')}>
            <i class="fas fa-utensils fa-lg"></i> Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" style={isActive('/cart')}>
            <i className='fas fa-shopping-cart fa-lg'></i> Cart
              
            </Link>
          </li>

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={isActive('/register')}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signin')}
                >
                  Sign In
                </Link>
              </li>
            </>
          )}

          {/* Admin Links */}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <li className="nav-item">
                <Link
                  to="/admin/dashboard"
                  className="nav-link"
                  style={isActive('/admin/dashboard')}
                >
                  <i className="fa fa-user-circle"></i>&nbsp; Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signout')}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>Logout
                </Link>
              </li>
            </>
          )}
          {/* User Links */}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <>
              <li className="nav-item">
                <Link
                  to="/user/dashboard"
                  className="nav-link"
                  style={isActive('/user/dashboard')}
                >
                  <i className="fa fa-user-circle"></i>&nbsp;
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="nav-link"
                  style={isActive('/signout')}
                  onClick={() => signout()}
                >
                  <i className="fa fa-sign-out-alt"></i>Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
