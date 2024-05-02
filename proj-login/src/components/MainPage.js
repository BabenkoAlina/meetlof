import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="container-1">
      <div className="Buttons">
        <div>
          <a href="/login">
            <button className="my-btn">
              <span>Login</span>
            </button>
          </a>
        </div>
        <div>
          <a href="/register">
            <button className="my-btn-1">
              <span>Register</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
