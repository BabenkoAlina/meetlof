import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterPage = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            await createUserWithEmailAndPassword(auth, email, password)
            alert('Registered successfully!');
        } catch (error) {
            const errorCode = error.code;
            let errorMessage = error.message;

            switch (errorCode) {
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Email address is already in use';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/missing-email':
                    errorMessage = 'Please enter an email address';
                    break;
                case 'auth/missing-password':
                    errorMessage = 'Please enter a password';
                    break;
                default:
                    break;
            }

            alert(errorMessage);
        }
    };

    return (
        <div>
            <Navbar isAuthenticated={false} />
            <h2>Register</h2>
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
