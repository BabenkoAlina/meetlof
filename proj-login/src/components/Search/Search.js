import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./Search.module.css";

function SearchPage() {
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

  return (
    <>
      <div className={styles.nav_profile}>
        <select id={styles.profile_dropdown} onChange={navigateProfile} defaultValue="">
          <option value="" disabled>Profile</option>
          <option value="viewProfile">View your profile</option>
          <option value="logout">Log out</option>
        </select>
      </div>

      <div id={styles.content_search}>
        <h2>We are looking for a match</h2>
        <div className={styles.loader}></div>
        <button id={styles.button_stop} onClick={() => history.push('/')}>
          Stop search
        </button>
      </div>
    </>
  );
}

export default SearchPage;
