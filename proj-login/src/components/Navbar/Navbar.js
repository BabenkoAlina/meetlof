import React from "react";
import { Link } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import { useHistory } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
    const history = useHistory();

    const handleLogout = () => {
        onLogout();
    };

    const navigateProfile = (event) => {
        const selectedOption = event.target.value;
        switch (selectedOption) {
            case "viewProfile":
                history.push("/tell_about");
                break;
            case "logout":
                handleLogout();
                break;
            default:
                break;
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to={isAuthenticated ? "/home" : "/"}>
                    <img src="logo.png" alt="Logo" />
                </Link>
            </div>
            {isAuthenticated && (
                <div className={styles.nav_profile}>
                    <select
                        id={styles.profile_dropdown}
                        onChange={navigateProfile}
                        defaultValue="">
                        <option value="" disabled>
                            Profile
                        </option>
                        <option value="viewProfile">View your profile</option>
                        <option value="logout">Log out</option>
                    </select>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
