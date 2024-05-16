import React, { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Navbar from "../Navbar/Navbar";
import styles from "./History.css";

const HistoryPage = () => {
    const [likedArray, setLikedArray] = useState([]);
    const [requestsArray, setRequestsArray] = useState([]);
    const [usersInfo, setUsersInfo] = useState({});
    const [actions, setActions] = useState({});
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;

            const usersInfoCollection = collection(db, "usersInfo");
            const usersHistoryDocRef = doc(db, "usersHistory", currentUser.uid);
            const usersSnapshot = await getDocs(usersInfoCollection);
            const historyDoc = await getDoc(usersHistoryDocRef);

            const userInfoMap = {};
            usersSnapshot.forEach((doc) => {
                userInfoMap[doc.data().userId] = doc.data();
            });

            setUsersInfo(userInfoMap);
            setLikedArray(historyDoc.data()?.likedArray || []);
            setRequestsArray(historyDoc.data()?.requestsArray || []);
        };

        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [currentUser]);

    const handleActionClick = async (userId, action) => {
        const currentUserHistoryDocRef = doc(
            db,
            "usersHistory",
            currentUser.uid
        );

        if (action === "like") {
            await updateDoc(currentUserHistoryDocRef, {
                [`history.${userId}`]: new Date(),
                likedArray: arrayUnion(userId),
            });

            const likedUserDocRef = doc(db, "usersHistory", userId);
            await updateDoc(likedUserDocRef, {
                requestsArray: arrayUnion(currentUser.uid),
            });
        } else if (action === "reject") {
            await updateDoc(currentUserHistoryDocRef, {
                rejectedList: arrayUnion(userId),
            });
        }

        setActions((prev) => ({
            ...prev,
            [userId]: action,
        }));
    };

    const renderUserInfo = (userId, action) => {
        const user = usersInfo[userId];
        const userAction = actions[userId];
        if (!user) return null;

        return (
            <tr key={userId}>
                <td>{user.name}</td>
                <td>{user.expectation}</td>
                <td>
                    {userAction === "like"
                        ? user.telegram
                        : userAction === "reject"
                        ? "rejected by me"
                        : action === "like"
                        ? user.likedByCurrentUser
                            ? user.telegram
                            : "N/A"
                        : "N/A"}
                </td>
                {action === "request" && !userAction && (
                    <td>
                        <button
                            onClick={() => handleActionClick(userId, "like")}>
                            Like
                        </button>
                        <button
                            onClick={() => handleActionClick(userId, "reject")}>
                            Reject
                        </button>
                    </td>
                )}
            </tr>
        );
    };

    return (
        <div>
            <Navbar isAuthenticated={true} />
            <div className={styles.historyContainer}>
                <h2>History Page</h2>
                <div className={styles.tableContainer}>
                    <h3>Requests I Sent</h3>
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Expectation</th>
                                <th>Telegram</th>
                            </tr>
                        </thead>
                        <tbody>
                            {likedArray.map((userId) =>
                                renderUserInfo(userId, "like")
                            )}
                        </tbody>
                    </table>
                </div>
                <div className={styles.tableContainer}>
                    <h3>Requests I Got</h3>
                    <table className={styles.historyTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Expectation</th>
                                <th>Telegram</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestsArray.map((userId) =>
                                renderUserInfo(userId, "request")
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
