// HomePage.js
import React from 'react';
import Navbar from '../Navbar/Navbar'; // Import the Navbar component

const HomePage = ({userEmail, onLogout}) => {
    return (
        <div>
            <Navbar isAuthenticated={true}/> {/* Pass isAuthenticated as true for home page */}
            <h2>Welcome, {userEmail}!</h2>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
