import React from 'react';
import '../static/search.css'; // Import CSS file

const Search = () => {
  // Your logic for handleProfileChange, handleStopSearch, etc.

  return (
    <div>
      {/* Navigator */}
      <header className="site-header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-steel fixed-top">
          <div className="container header-container">
            <a className="navbar-brand mr-4" href="/">Meetlof</a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggle"
              aria-controls="navbarToggle"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggle">
              <div className="navbar-nav mr-auto">
                {/* Navbar Left Side */}
              </div>
              {/* Navbar Right Side */}
              <div className="navbar-nav">
                {/* You can conditionally render Login/Register links here */}
              </div>
            </div>
          </div>
        </nav>
      </header>
     
      <main>
        <div className="nav_profile">
          <select id="profile_dropdown" onChange={handleProfileChange}>
            <option value="" disabled selected>Profile</option>
            <option value="/view_profile">View your profile</option>
            <option value="/logout">Log out</option>
          </select>
        </div>

        <div id="content_search">
          <p id="search_title"> We are looking for a match </p>

          <div className="loader"></div>

          <button id="button_stop" onClick={handleStopSearch}>
            Stop search
          </button>
        </div>
      </main>
    </div>
  );
}

export default Search;
