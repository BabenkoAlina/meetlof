import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import GreetingPage from "./components/GreetingPage/GreetingPage";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import TellAbout from "./components/TellAbout/TellAbout";
import MatchFound from "./components/Match/MatchFound";
import Contact from "./components/Contacts/Contacts";
import Search from "./components/Search/Search";
import History from "./components/History/History";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setLoggedIn(true);
            } else {
                setUserEmail("");
                setLoggedIn(false);
            }
            setLoading(false); // Set loading to false after auth state is determined
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogin = (email) => {
        setUserEmail(email);
        setLoggedIn(true);
    };

    const handleLogout = () => {
        auth.signOut().then(() => {
            setUserEmail("");
            setLoggedIn(false);
        });
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking auth status
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={GreetingPage} />
                    <Route path="/login">
                        {loggedIn ? (
                            <Redirect to="/home" />
                        ) : (
                            <LoginPage onLogin={handleLogin} />
                        )}
                    </Route>
                    <Route path="/register">
                        {loggedIn ? (
                            <Redirect to="/home" />
                        ) : (
                            <RegisterPage />
                        )}

                    </Route>
                    <Route path="/home">
                        {loggedIn ? (
                            <div>
                                <Navbar isAuthenticated={loggedIn} onLogout={handleLogout} />
                                <HomePage userEmail={userEmail} />
                            </div>
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/tell_about">
                        {loggedIn ? (
                            <TellAbout />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/match_found">
                        {loggedIn ? (
                            <MatchFound />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/contacts">
                        {loggedIn ? (
                            <Contact />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/search">
                        {loggedIn ? (
                            <Search />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route path="/history">
                        {loggedIn ? (
                            <History />
                        ) : (
                            <Redirect to="/login" />
                        )}
                    </Route>
                    <Route render={() => (loggedIn ? <Redirect to="/home" /> : <Redirect to="/" />)} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
