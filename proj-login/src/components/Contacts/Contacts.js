import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import Footer from '../Footer/Footer';
import styles from './Contacts.module.css'; // Import the CSS module
import { useHistory } from 'react-router-dom';


function Contact() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
 

  const navigateProfile = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "viewProfile":
        history.push("/tell_about");
        break;
      case "logout":
        setUserEmail("");
        history.push("/");
        break;
      default:
        break;
    }
  };

    const handleHomePage = () => {
        history.push("/");
    };
    return (
      <div>
      {/* <Navbar isAuthenticated={true}/> */}
        <div className={styles.nav_profile}>
        <select id={styles.profile_dropdown} onChange={navigateProfile} defaultValue="">
                    <option value="" disabled>Profile</option>
                    <option value="viewProfile">View your profile</option>
                    <option value="logout">Log out</option>
                </select>
        </div>
  
        <div className={styles.match_card}>
          <h2>CONGRATULATIONS! YOU HAVE A MATCH!</h2>
          <h3>Your match:</h3>
          <p>Name: some text</p>
          <p>Contact: some text</p>
          <button className={styles.search} onClick={handleHomePage}>Home page</button>
        </div>
      </div>
    );
  }
  
  export default Contact;
  