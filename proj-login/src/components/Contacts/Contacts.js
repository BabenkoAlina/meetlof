import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import Footer from '../Footer/Footer';
import styles from './Contacts.module.css'; // Import the CSS module
import { useHistory } from 'react-router-dom';


function Contact() {
    const history = useHistory();
    const handleProfileChange = (event) => {
      console.log(event.target.value);
    };
    const handleHomePage = () => {
        history.push("/");
    }
    return (
      <div>
        <div className={styles.nav_profile}>
          <select id={styles.profile_dropdown} defaultValue="" onChange={handleProfileChange}>
            <option value="" disabled>Profile</option>
            <option value="viewProfile">View your profile</option>
            <option value="logout">Log out</option>
          </select>
        </div>
  
        <div className={styles.match_card}>
          <h2>Congratulations! You have a match!</h2>
          <h3>Your match:</h3>
          <p>Name: some text</p>
          <p>Contact: some text</p>
          <button className={styles.search} onClick={handleHomePage}>Home page</button>
        </div>
      </div>
    );
  }
  
  export default Contact;
  