// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Footer from "../Footer/Footer";
import styles from "../GreetingPage/GreetingPage.module.css";

function HomePage({ curUserEmail, onLogout }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (user) {
                setUserEmail(user.email);
                setLoggedIn(true);
            }
        };

        fetchUser();
    }, []);

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

    const handleSearchClick = async () => {
        if (!loggedIn) {
            alert("Please log in to search for a match.");
            return;
        }
    
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert("User not found. Please log in again.");
            return;
        }
    
        const userId = currentUser.uid;
        const userDocRef = doc(db, "usersInfo", userId);
    
        const userDoc = await getDoc(userDocRef);
    
        if (!userDoc.exists()) {
            alert("User profile not found. Please fill in your profile information before searching for matches.");
            history.push("/tell_about");
            return;
        }
    
        const userData = userDoc.data();
    
        if (!userData || !userData.name) {
            alert("Please fill in your profile information before searching for matches.");
            history.push("/tell_about");
            return;
        }
    
        history.push("/search");
    };

    return (
        <div className={styles.main}>
            <div className={styles.parent}>
                <div className={styles.page}>
                    <div>
                        <div className={`${styles["greeting-text"]} ${styles["title"]}`}>
                            <h1>Welcome to MeetLoF!</h1>
                            <h2>MeetLoF is an online community to find friends</h2>
                        </div>
                        <div className={styles["greeting-container"]}>
                            <div className={styles["horizontal-images"]}>
                                <img src="/friends.jpeg" alt="Friends" />
                                <img src="/couple.webp" alt="Couple" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button className={styles["my-btn"]} onClick={handleSearchClick}>
                            <span>Search for a match</span>
                        </button>
                    </div>
                    <div>
                        <h2 className={styles.title}>Explore useful tips down below!</h2>
                        <div className={styles["explore-topic"]}>
                            <img src="/icebreakers.jpeg" alt="Ice breakers" />
                            <div className={styles["explore-table"]}>
                                <h3 className={styles["explore-title"]}>
                                    100 icebreaker questions
                                </h3>
                                <p>
                                    Mural is a collaborative online platform that
                                    enhances team communication with fun and
                                    engaging icebreaker questions. It offers a wide
                                    range of icebreaker categories suitable for any
                                    team meeting or classroom setting. The website
                                    provides easy access to over 100 questions
                                    designed to help team members connect and
                                    communicate effectively.
                                    <br />
                                    <a href="https://www.mural.co/blog/icebreaker-questions">
                                        LINK
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className={styles["explore-topic"]}>
                            <img src="/onlineconv.jpeg" alt="Online conversation" />
                            <div className={styles["explore-table"]}>
                                <h3 className={styles["explore-title"]}>
                                    How to Start a Conversation Online
                                </h3>
                                <p>
                                    So you're trying to get to know someone. Email,
                                    dating sites and instant-messaging services may
                                    make it more convenient to communicate with our
                                    friends and family, but it can be hard to get to
                                    know a new person when you aren't speaking
                                    face-to-face. More and more people are meeting
                                    their friends, partners, and spouses on the
                                    Internet, and here's the thing: it's awkward for
                                    everyone! Be curious, but not pushy; relax, and
                                    try to be yourself. More here:
                                    <br />
                                    <a href="https://www.wikihow.com/Start-a-Conversation-Online">
                                        LINK
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
