// RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component



const RegisterPage = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registeredUsernames, setRegisteredUsernames] = useState([]); // Define the array

    const handleRegister = () => {
        // Validate registration data
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Check if the username is already registered
        if (registeredUsernames.includes(username)) {
            alert('Username is already taken');
            return;
        }

        // Call the onRegister callback with the registration data
        onRegister({ username, email, password });

        // Update the array of registered usernames
        setRegisteredUsernames([...registeredUsernames, username]);
    };

    return (
        <div>
            <Navbar isAuthenticated={false} /> {/* Pass isAuthenticated as false for register page */}
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
