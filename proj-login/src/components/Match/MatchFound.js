import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./MatchFound.module.css";
import { auth, db } from "../../firebaseConfig";
import {
    collection,
    doc,
    updateDoc,
    arrayUnion,
    getDocs,
    getDoc,
} from "firebase/firestore";

function MatchFound() {
    const history = useHistory();
    const currentUser = auth.currentUser;
    const [userEmail, setUserEmail] = useState("");
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const matchTime = new Date();

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

    const calculateMatchPercentage = (user1, user2) => {
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

    const fetchAndSortUsers = async () => {
        const usersInfoCollection = collection(db, "usersInfo");
        const usersHistoryDocRef = doc(db, "usersHistory", currentUser.uid);
        const usersSnapshot = await getDocs(usersInfoCollection);
        const historyDoc = await getDoc(usersHistoryDocRef);

        const currentUserInfo = usersSnapshot.docs
            .find((doc) => doc.data().userId === currentUser.uid)
            ?.data();
        const rejectedList = historyDoc.data()?.rejectedList || [];

        let userMatches = [];

        usersSnapshot.forEach((doc) => {
            if (
                doc.data().userId !== currentUser.uid &&
                !rejectedList.includes(doc.data().userId)
            ) {
                const matchPercentage = calculateMatchPercentage(
                    currentUserInfo,
                    doc.data()
                );
                userMatches.push({
                    userId: doc.data().userId,
                    matchPercentage,
                    data: doc.data(),
                });
            }
        });

        userMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

        if (userMatches.length > 0) {
            setMatchedUsers(userMatches);
            await updateDoc(usersHistoryDocRef, {
                likedArray: userMatches.map((user) => user.userId),
            });
        }
    };

    useEffect(() => {
        fetchAndSortUsers();
    }, []);

    const handleLikeClick = async () => {
        if (currentUser && matchedUsers.length > currentMatchIndex) {
            const userDocRef = doc(db, "usersHistory", currentUser.uid);
            await updateDoc(userDocRef, {
                [`history.${matchedUsers[currentMatchIndex].userId}`]:
                    matchTime,
            });
            setCurrentMatchIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleSkipClick = async () => {
        if (currentUser && matchedUsers.length > currentMatchIndex) {
            const userDocRef = doc(db, "usersHistory", currentUser.uid);
            await updateDoc(userDocRef, {
                rejectedList: arrayUnion(
                    matchedUsers[currentMatchIndex].userId
                ),
            });
            setCurrentMatchIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleExitClick = () => {
        history.push("/home");
    };

    return (
        <div>
            <Navbar isAuthenticated={true} />
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
            {matchedUsers.length > 0 &&
            currentMatchIndex < matchedUsers.length ? (
                <div className={styles.match_card}>
                    <h2>MATCH FOUND</h2>
                    <div className={styles.match_card_top}>
                        <div className={styles.match_card_top_right}>
                            <h3>What your best match is looking for:</h3>
                            <p>
                                {matchedUsers[currentMatchIndex].data
                                    .expectation || "No expectations provided."}
                            </p>
                        </div>
                    </div>
                    <div className={styles.match_card_bottom}>
                        <button
                            className={styles.like}
                            onClick={handleLikeClick}>
                            Like
                        </button>
                        <button
                            className={styles.skip}
                            onClick={handleSkipClick}>
                            Skip
                        </button>
                        <button
                            className={styles.exit}
                            onClick={handleExitClick}>
                            Exit
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles.no_match}>
                    <h2>No Matches Found</h2>
                    <button className={styles.exit} onClick={handleExitClick}>
                        Exit
                    </button>
                </div>
            )}
        </div>
    );
}

export default MatchFound;
