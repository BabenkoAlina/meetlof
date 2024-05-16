import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Navbar from "../Navbar/Navbar";
import styles from "./History.css";

const HistoryPage = () => {
    const [likedArray, setLikedArray] = useState([]);
    const [requestsArray, setRequestsArray] = useState([]);
    const [usersInfo, setUsersInfo] = useState({});
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

    const renderUserInfo = (userId, action) => {
        const user = usersInfo[userId];
        if (!user) return null;

        return (
            <tr key={userId}>
                <td>{user.name}</td>
                <td>{user.expectation}</td>
                <td>
                    {action === "like" && user.likedByCurrentUser
                        ? user.telegram
                        : action === "reject" && !user.likedByCurrentUser
                        ? "rejected by LoF"
                        : action === "request" && user.likedByCurrentUser
                        ? user.telegram
                        : action === "request" && !user.likedByCurrentUser
                        ? "rejected by me"
                        : "N/A"}
                </td>
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
