// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem(username));
    console.log('userData:', userData);

    // Check if user exists and password matches
    if (userData && userData.password === password) {
      console.log('Login successful');
      onLogin(username);
    } else {
      console.log('Login failed');
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <Navbar isAuthenticated={false} /> {/* Pass isAuthenticated as false for login page */}
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
