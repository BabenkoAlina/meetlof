import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "../RegisterPage/RegisterPage.module.css";
import Footer from "../Footer/Footer";

const RegisterPage = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "usersHistory", user.uid), {
        userId: user.uid,
        history: {},
        rejectedList: [],
        likedArray: [],
        requestsArray: [],
      });

      alert("Registered successfully!");
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = error.message;

      switch (errorCode) {
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email address is already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        case "auth/missing-email":
          errorMessage = "Please enter an email address";
          break;
        case "auth/missing-password":
          errorMessage = "Please enter a password";
          break;
        default:
          break;
      }

      alert(errorMessage);
    }
  };

  return (
    <div className={styles.main}>
      <Navbar isAuthenticated={false} />
      <div className={styles.parent}>
        <div className={styles.page}>
          <h2>Register</h2>
          <p>Email</p>
          <input
            type="email"
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
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <div className={styles.hr}></div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default RegisterPage;
