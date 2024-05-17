import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import styles from "./Search.module.css";
import axios from "axios";

function SearchPage({ onLogout }) {
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
        const response = await axios.get("https://api.quotable.io/random");
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

      const currentUserHistoryDocRef = doc(db, "usersHistory", currentUser.uid);
      const currentUserHistoryDoc = await getDoc(currentUserHistoryDocRef);
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
            !currentUserHistoryData.rejectedList.includes(userData.userId) &&
            !currentUserHistoryData.likedArray.includes(userData.userId)
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
        const batch = writeBatch(db);
        for (const user of otherUsers) {
          if (user.userId) {
            const likedUserDocRef = doc(db, "usersHistory", user.userId);
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
        }
        await batch.commit();

        setHasFoundMatches(true);

        setTimeout(() => {
          history.push("/match_found");
        }, 1000);
      } else {
        setHasFoundMatches(true);
        setTimeout(() => {
          history.push("/match_not_found");
        }, 1000);
      }
    };

    findMatches();
  }, [currentUser, hasFoundMatches, history]);

  return (
    <>
      <div className={styles.cont}>
        <Navbar isAuthenticated={true} onLogout={onLogout} />
        <div id={styles.content_search}>
          <h2>We are looking for a match</h2>
          <h4>Make sure, that you have edited your profile</h4>
          <div className={styles.loader}></div>
          <button id={styles.button_stop} onClick={() => history.push("/home")}>
            Stop search
          </button>
          <div>
            <p className={styles.quote}>{quote}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
