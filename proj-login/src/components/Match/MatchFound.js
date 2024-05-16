import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './MatchFound.module.css';

function MatchFound() {
    const history = useHistory();
    const [userEmail, setUserEmail] = useState("");

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

    const handleLikeClick = () => {
        history.push('/contacts');
    };

    const handleSkipClick = () => {
        history.push('/search');
    };

    return (
        <div>
            <Navbar isAuthenticated={true} />
            <div className={styles.nav_profile}>
                <select id={styles.profile_dropdown} onChange={navigateProfile} defaultValue="">
                    <option value="" disabled>Profile</option>
                    <option value="viewProfile">View your profile</option>
                    <option value="logout">Log out</option>
                </select>
            </div>
            <div className={styles.match_card}>
                <h2>MATCH FOUND</h2>
                <div className={styles.match_card_top}>
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
