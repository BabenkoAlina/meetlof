// LoginPage.js

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {auth} from "../../firebaseConfig";
import {signInWithEmailAndPassword} from "firebase/auth";
import Navbar from '../Navbar/Navbar'; // Import the Navbar component
import Footer from '../Footer/Footer';
import styles from './MatchFound.module.css'; // Import the CSS module
import { useHistory } from 'react-router-dom';

function MatchFound() {
    const history = useHistory();

    const handleProfileChange = (event) => {
      console.log(event.target.value);
    };
    const handleLikeClick = () => {
        history.push('/contacts');
      };

    const handleSkipClick = () => {
        history.push('/search');
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
          <h2>MATCH FOUND</h2>
          <div className={styles.match_card_top}>
            {/* here backgroung image can be set */}
            <div className={styles.match_card_top_right}>
              <h3>What your best match is looking for:</h3>
              <p>Sit osculatur puer tuus aut uxorem tuam, osculum, non dico quod omnia quae sunt hominis, et sic non tangetur, si aut ex eis moriatur. Nam tristique facilisis dolor, non lacinia quam. Curabitur sed posuere enim, eget luctus justo. Cras rhoncus porttitor varius. In sit amet eros venenatis, consequat nibh et, sollicitudin lorem. Suspendisse pretium libero dui, eu aliquet leo congue et.</p>
            </div>
          </div>
          <div className={styles.match_card_bottom}>
            <button className={styles.like} onClick={handleLikeClick}>Like</button>
            <button className={styles.skip} onClick={handleSkipClick}>Skip</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default MatchFound;