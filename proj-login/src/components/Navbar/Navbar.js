import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from "../Navbar/Navbar.module.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav>
            <div className="logo">
                <Link to={isAuthenticated ? '/home' : '/'}>
                    <img src="logo.png" alt="Logo"/>
                </Link>
            </div>
            <button>Logout</button>
        </nav>
    );
};

export default Navbar;
