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
            .find((doc) => doc.id === currentUser.uid)
            ?.data();
        const rejectedList = historyDoc.data()?.rejectedList || [];

        let userMatches = [];

        usersSnapshot.forEach((doc) => {
            if (doc.id !== currentUser.uid && !rejectedList.includes(doc.id)) {
                const matchPercentage = calculateMatchPercentage(
                    currentUserInfo,
                    doc.data()
                );
                userMatches.push({ userId: doc.id, matchPercentage });
            }
        });

        userMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);

        if (userMatches.length > 0) {
            setMatchedUsers(userMatches);
        }
    };

    useEffect(() => {
        fetchAndSortUsers();
    }, []);


    const handleLikeClick = async () => {
        if (currentUser && matchedUsers.length > currentMatchIndex) {
            const userDocRef = doc(db, "usersHistory", currentUser.uid);
            const likedUserDocRef = doc(
                db,
                "usersHistory",
                matchedUsers[currentMatchIndex].userId
            );
            await updateDoc(userDocRef, {
                [`history.${matchedUsers[currentMatchIndex].userId}`]:
                    matchTime,
            });
            await updateDoc(likedUserDocRef, {
                requestsArray: arrayUnion(currentUser.uid),
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
            <div className={styles.match_card}>
                <h2>MATCH FOUND</h2>
                <div className={styles.match_card_top}>
                    <div className={styles.match_card_top_right}>
                        <h3>What your best match is looking for:</h3>
                        <p>
                            Sit osculatur puer tuus aut uxorem tuam, osculum,
                            non dico quod omnia quae sunt hominis, et sic non
                            tangetur, si aut ex eis moriatur. Nam tristique
                            facilisis dolor, non lacinia quam. Curabitur sed
                            posuere enim, eget luctus justo. Cras rhoncus
                            porttitor varius. In sit amet eros venenatis,
                            consequat nibh et, sollicitudin lorem. Suspendisse
                            pretium libero dui, eu aliquet leo congue et.
                        </p>
                    </div>
                </div>
                <div className={styles.match_card_bottom}>
                    <button className={styles.like} onClick={handleLikeClick}>
                        Like
                    </button>
                    <button className={styles.skip} onClick={handleSkipClick}>
                        Skip
                    </button>
                </div>
                <button
                    className={styles.exit}
                    onClick={() => history.push("/home")}>
                    Exit
                </button>
            </div>
        </div>
    );
}

export default MatchFound;
