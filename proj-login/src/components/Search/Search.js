import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    collection,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    getDoc,
    writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import styles from "./Search.module.css";
import axios from "axios";

function SearchPage() {
    const [userEmail, setUserEmail] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [hasFoundMatches, setHasFoundMatches] = useState(false);
    const history = useHistory();
    const [quote, setQuote] = useState("");

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
                const response = await axios.get(
                    "https://api.quotable.io/random"
                );
                setQuote(response.data.content + " - " + response.data.author);
            } catch (error) {
                console.error("Error fetching quote: ", error);
            }
        };
        fetchQuote();
    }, []);

    useEffect(() => {
        if (!currentUser || hasFoundMatches) return;

        const defaultAttributes = {
            agreeToShare: false,
            bookworm: false,
            cinemaddict: false,
            expectation: "",
            isFemale: false,
            isMale: false,
            lookingForChat: false,
            lookingForFemale: false,
            lookingForFriend: false,
            lookingForLover: false,
            lookingForMale: false,
            music: false,
            politics: false,
            procrastinate: false,
            promenade: false,
            sportsman: false,
            years17: false,
            years20: false,
            years23: false,
            years25: false,
        };

        const initializeAttributes = (user) => {
            const initializedUser = { ...defaultAttributes, ...user };
            return initializedUser;
        };

        const calculateMatchPercentage = (user1, user2) => {
            if (!user1 || !user2) return 0;

            const attributes = Object.keys(defaultAttributes);

            let matches = 0;
            attributes.forEach((attr) => {
                if (user1[attr] === user2[attr]) {
                    matches += 1;
                }
            });
            return (matches / attributes.length) * 100;
        };

        const findMatches = async () => {
            console.log("Finding matches...");
            const usersInfoCollection = collection(db, "usersInfo");
            const usersSnapshot = await getDocs(usersInfoCollection);

            const currentUserDoc = usersSnapshot.docs.find(
                (doc) => doc.data().userId === currentUser.uid
            );
            const currentUserData = currentUserDoc
                ? initializeAttributes(currentUserDoc.data())
                : null;

            if (!currentUserData) return;

            const currentUserHistoryDocRef = doc(
                db,
                "usersHistory",
                currentUser.uid
            );
            const currentUserHistoryDoc = await getDoc(
                currentUserHistoryDocRef
            );
            let currentUserHistoryData = currentUserHistoryDoc.exists()
                ? currentUserHistoryDoc.data()
                : { rejectedList: [], likedArray: [], requestsArray: [] };

            if (!currentUserHistoryDoc.exists()) {
                await setDoc(currentUserHistoryDocRef, currentUserHistoryData);
            }

            const otherUsers = usersSnapshot.docs
                .filter((doc) => {
                    const userData = doc.data();
                    return (
                        userData.userId !== currentUser.uid &&
                        !currentUserHistoryData.rejectedList.includes(
                            userData.userId
                        ) &&
                        !currentUserHistoryData.likedArray.includes(
                            userData.userId
                        )
                    );
                })
                .map((doc) => {
                    const userData = initializeAttributes(doc.data());
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
                const likedArray = otherUsers.map((user) => user.userId);
                await updateDoc(currentUserHistoryDocRef, {
                    likedArray: likedArray,
                });

                // Add the current user to the requestsArray of each liked user
                const batch = writeBatch(db);
                for (const user of otherUsers) {
                    const likedUserDocRef = doc(
                        db,
                        "usersHistory",
                        user.userId
                    );
                    const likedUserDoc = await getDoc(likedUserDocRef);
                    if (!likedUserDoc.exists()) {
                        await setDoc(likedUserDocRef, {
                            rejectedList: [],
                            likedArray: [],
                            requestsArray: [],
                        });
                    }
                    batch.update(likedUserDocRef, {
                        requestsArray: arrayUnion(currentUser.uid),
                    });
                }
                await batch.commit();

                setHasFoundMatches(true);

                // Add a delay before navigating to the match_found page
                setTimeout(() => {
                    history.push("/match_found");
                }, 1000); // 1 second delay
            }
        };

        findMatches();
    }, [currentUser, hasFoundMatches, history]);

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
