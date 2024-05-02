// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import GreetingPage from './components/GreetingPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (username) => {
    setUsername(username);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  const handleRegister = ({ username, password }) => {
    // Assuming you have already implemented the registration logic
    localStorage.setItem(username, JSON.stringify({ username, password }));
    alert('Registered successfully!');
    window.location.href = '/login'; // Redirect to the login page after successful registration
  };

  return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={GreetingPage} />
            <Route path="/login">
              {loggedIn ? <Redirect to="/home" /> : <LoginPage onLogin={handleLogin} />}
            </Route>
            <Route path="/register" render={() => <RegisterPage onRegister={handleRegister} />} />
            <Route path="/home">
              {loggedIn ? (
                  <HomePage username={username} onLogout={handleLogout} />
              ) : (
                  <Redirect to="/" />
              )}
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
  );
};
export default App;
