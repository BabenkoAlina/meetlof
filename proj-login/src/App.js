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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setLoggedIn(true);
            } else {
                setUserEmail("");
                setLoggedIn(false);
            }
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
        setUserEmail("");
        setLoggedIn(false);
    };

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
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/home">
                        {loggedIn ? (
                            <div>
                                <Navbar
                                    isAuthenticated={loggedIn}
                                    onLogout={handleLogout}
                                />
                                <HomePage userEmail={userEmail} />
                            </div>
                        ) : (
                            <Redirect to="/" />
                        )}
                    </Route>
                    <Route path="/tell_about" component={TellAbout} />

                    <Route path="/match_found" component={MatchFound} />
                    <Route path="/contacts" component={Contact} />
                    <Route path="/search" component={Search} />
                    <Route path="/history" component={History} />
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
