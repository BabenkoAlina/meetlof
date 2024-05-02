// GreetingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const GreetingPage = () => {
  return (
    <div>
      <Navbar isAuthenticated={false} /> {/* Pass isAuthenticated as false for greeting page */}
      <h1>Welcome to Your App!</h1>
      <p>Please select an option:</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default GreetingPage;
