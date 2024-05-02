// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav>
      <div className="logo">
        <Link to={isAuthenticated ? '/home' : '/'}> {/* Redirect to home if authenticated, else to greeting */}
          <img src="logo.png" alt="Logo" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
