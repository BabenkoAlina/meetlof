import React, { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import Navbar from "../Navbar/Navbar";
import "./History.css"; // Correctly import the CSS file

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

            const actionsMap = {};
            (historyDoc.data()?.likedArray || []).forEach((userId) => {
                actionsMap[userId] = "like";
            });
            (historyDoc.data()?.rejectedList || []).forEach((userId) => {
                actionsMap[userId] = "reject";
            });

            setActions(actionsMap);
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
            const timestamp = new Date();
            await updateDoc(currentUserHistoryDocRef, {
                [`history.${userId}`]: timestamp,
                likedArray: arrayUnion(userId),
                requestsArray: arrayRemove(userId),
            });

            const likedUserDocRef = doc(db, "usersHistory", userId);
            const likedUserDoc = await getDoc(likedUserDocRef);
            const likedUserData = likedUserDoc.data();

            if (!likedUserData?.likedArray?.includes(currentUser.uid)) {
                await updateDoc(likedUserDocRef, {
                    requestsArray: arrayUnion(currentUser.uid),
                });
            } else {
                await updateDoc(currentUserHistoryDocRef, {
                    [`history.${userId}`]: timestamp,
                });
                await updateDoc(likedUserDocRef, {
                    [`history.${currentUser.uid}`]: timestamp,
                });
            }

            setRequestsArray((prev) => prev.filter((id) => id !== userId));
            setLikedArray((prev) => [...prev, userId]);
        } else if (action === "reject") {
            await updateDoc(currentUserHistoryDocRef, {
                rejectedList: arrayUnion(userId),
                requestsArray: arrayRemove(userId),
            });

            setRequestsArray((prev) => prev.filter((id) => id !== userId));
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
                            className="like"
                            onClick={() => handleActionClick(userId, "like")}>
                            Like
                        </button>
                        <button
                            className="reject"
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
            <div className="historyContainer">
                <h2>History Page</h2>
                <div className="tableContainer">
                    <h3>Users I liked</h3>
                    <table className="historyTable">
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
                <div className="tableContainer">
                    <h3>Requests I Got</h3>
                    <table className="historyTable">
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
