import React, {useState} from 'react';
import './Search.module.css'
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from "./Search.module.css"

function SearchPage({ isAuthenticated }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  const navigateProfile = () => {
    // Implement how to navigate based on selection
  };
  const handleAboutPage = () => {
    history.push("/tell_about")
  }
  const handleLogout = () => {
    setUserEmail("");
    setLoggedIn(false);
    history.push("/");

}
  return (
    <>
      {/* <header className={styles.site_header}>
      </header> */}
      
      <div>
        <div className={styles.nav_profile}>
          <select id={styles.profile_dropdown} onChange={navigateProfile}>
            <option value="" disabled selected>Profile</option>
            <option value="viewProfile" onClick={handleAboutPage}>View your profile</option>
            <option value="logout" onClick={handleLogout}>Log out</option>
          </select>
        </div>

        <div id={styles.content_search}>
          <h2 id="search_title">We are looking for a match</h2>
          <div className={styles.loader}></div>
          <button id={styles.button_stop} onClick={() => history.push('/')}>
            Stop search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchPage;