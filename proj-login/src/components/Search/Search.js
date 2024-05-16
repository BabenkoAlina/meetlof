import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import styles from "./Search.module.css";
import axios from 'axios';

function SearchPage() {
    const [userEmail, setUserEmail] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [quote, setQuote] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            const user = auth.currentUser;
            if (user) {
                setUserEmail(user.email);
                setCurrentUser(user);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.quotable.io/random');
                setQuote(response.data.content + " - " + response.data.author);
            } catch (error) {
                console.error('Error fetching quote: ', error);
            }
        };
        fetchQuote();
    }, []);

    useEffect(() => {
        const calculateMatchPercentage = (user1, user2) => {
            if (!user1 || !user2) return 0;

            const attributes = [
                "agreeToShare",
                "bookworm",
                "cinemaddict",
                "expectation",
                "isFemale",
                "isMale",
                "lookingForChat",
                "lookingForFemale",
                "lookingForFriend",
                "lookingForLover",
                "lookingForMale",
                "music",
                "politics",
                "procrastinate",
                "promenade",
                "sportsman",
                "years17",
                "years20",
                "years23",
                "years25",
            ];

            let matches = 0;
            attributes.forEach((attr) => {
                if (user1[attr] === user2[attr]) {
                    matches += 1;
                }
            });
            return (matches / attributes.length) * 100;
        };

        const findMatches = async () => {
            if (!currentUser) return;
            const usersInfoCollection = collection(db, "usersInfo");
            const usersHistoryCollection = collection(db, "usersHistory");
            const usersSnapshot = await getDocs(usersInfoCollection);
            const historySnapshot = await getDocs(usersHistoryCollection);

            const currentUserDoc = usersSnapshot.docs.find(
                (doc) => doc.data().userId === currentUser.uid
            );
            const currentUserData = currentUserDoc
                ? currentUserDoc.data()
                : null;

            if (!currentUserData) return;

            const currentUserHistoryDoc = historySnapshot.docs.find(
                (doc) => doc.id === currentUser.uid
            );
            const currentUserHistoryData = currentUserHistoryDoc
                ? currentUserHistoryDoc.data()
                : { rejectedList: [] };

            const otherUsers = usersSnapshot.docs
                .filter(
                    (doc) =>
                        doc.data().userId !== currentUser.uid &&
                        !currentUserHistoryData.rejectedList.includes(
                            doc.data().userId
                        )
                )
                .map((doc) => {
                    const userData = doc.data();
                    return {
                        userId: userData.userId,
                        data: userData,
                        matchPercentage: calculateMatchPercentage(
                            currentUserData,
                            userData
                        ),
                    };
                });

            otherUsers.sort((a, b) => b.matchPercentage - a.matchPercentage);

            if (otherUsers.length > 0) {
                const bestMatchId = otherUsers[0].userId;
                const likedArray = otherUsers.map((user) => user.userId);

                await updateDoc(doc(db, "usersHistory", currentUser.uid), {
                    likedArray: likedArray,
                });

                // Add a delay before navigating to the match_found page
                setTimeout(() => {
                    history.push("/match_found");
                }, 1000); // 1 second delay
            }
        };

        findMatches();
    }, [currentUser, history]);

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

      <div id={styles.content_search}>
        <h2>We are looking for a match</h2>
        <div className={styles.loader}></div>
        <button
            id={styles.button_stop}
            onClick={() => history.push("/home")}>
            Stop search
        </button>
        <div>
            <p className={styles.quote}>{quote}</p>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
