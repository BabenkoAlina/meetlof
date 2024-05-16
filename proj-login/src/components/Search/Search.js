import React from 'react';
import './Search.module.css'
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import styles from "./Search.module.css"

function SearchPage({ isAuthenticated }) {
  const history = useHistory();

  const navigateProfile = () => {
    // Implement how to navigate based on selection
  };

  return (
    <>
      <header className={styles.site_header}>
      </header>
      
      <main>
        <div className={styles.nav_profile}>
          <select id={styles.profile_dropdown} onChange={navigateProfile}>
            <option value="" disabled selected>Profile</option>
            <option value="viewProfile">View your profile</option>
            <option value="logout">Log out</option>
          </select>
        </div>

        <div id={styles.content_search}>
          <p id="search_title">We are looking for a match</p>
          <div className={styles.loader}></div>
          <button id={styles.button_stop} onClick={() => history.push('/some-path')}>
            Stop search
          </button>
        </div>
      </main>
    </>
  );
}

export default SearchPage;