// LoginPage.js
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import Footer from '../Footer/Footer';
import styles from './LoginPage.module.css'; // Import the CSS module

const LoginPage = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('user:', user);
            onLogin(email);
        } catch (error) {
            const errorCode = error.code;
            let errorMessage = error.message;

            // Customize error message based on error code
            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'User not found';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                case 'auth/missing-email':
                    errorMessage = 'Please enter an email address';
                    break;
                case 'auth/missing-password':
                    errorMessage = 'Please enter a password';
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Wrong password';
                    break;
                default:
                    break;
            }


            console.error('errorCode:', errorCode);
            console.error('errorMessage:', errorMessage);

            alert(errorMessage);
        }
    };
    return (
        <div className={styles.main}>
            <Navbar isAuthenticated={false}/> {/* Pass isAuthenticated as false for login page */}
            <div className={styles.parent}>
                <div className={styles.page}>
                    <h2>Login</h2>
                    <p>Email</p>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                    <div className={styles.hr}></div>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
            <Footer className={styles.footer} />
        </div>
    );
};

export default LoginPage;
