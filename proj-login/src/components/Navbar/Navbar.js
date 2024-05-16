import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Navbar/Navbar.module.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav>
      <div className="logo">
        <Link to={isAuthenticated ?
             '/home' : '/'}>
          <img src="logo.png" alt="Logo"/>
        </Link>
      </div>

      {isAuthenticated && (
        <button onClick={handleLogout}>LogOut</button>
      )}
    </nav>
  );
};

export default Navbar;
