// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can perform logout logic here if needed
    // For now, just navigate to the welcome page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Updated background color to dark blue */}
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                className="btn btn-outline-light" /* Updated button color to white */
                onMouseOver={(e) => (e.target.style.backgroundColor = '#000')} /* Change background color to black on hover */
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')} /* Change background color back to transparent on hover out */
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
