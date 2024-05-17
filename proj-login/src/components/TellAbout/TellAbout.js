import React, { useEffect, useState } from "react";
import styles from "../TellAbout/TellAbout.module.css";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useHistory } from 'react-router-dom';
import { auth, db } from "../../firebaseConfig";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function TellAbout() {
    const history = useHistory();

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [telegram, setTelegram] = useState("");
    const [isFemale, setIsFemale] = useState(true);
    const [isMale, setIsMale] = useState(false);
    const [uploadedPhoto, setUploadedPhoto] = useState(null);
    const [cinemaddict, setCinemaddict] = useState(false);
    const [music, setMusic] = useState(false);
    const [bookworm, setBookworm] = useState(false);
    const [politics, setPolitics] = useState(false);
    const [sportsman, setSportsman] = useState(false);
    const [procrastinate, setProcrastinate] = useState(false);
    const [promenade, setPromenade] = useState(false);
    const [lookingForFemale, setLookingForFemale] = useState(false);
    const [lookingForMale, setLookingForMale] = useState(false);
    const [lookingForFriend, setLookingForFriend] = useState(false);
    const [lookingForLover, setLookingForLover] = useState(false);
    const [lookingForChat, setLookingForChat] = useState(false);
    // const [years17, setYears17] = useState(true);
    // const [years20, setYears20] = useState(false);
    // const [years23, setYears23] = useState(true);
    // const [years25, setYears25] = useState(false);
    const [expectation, setExpectation] = useState("");
    const [agreeToShare, setAgreeToShare] = useState(false);

    useEffect(() => {
        // Set the user ID once the component mounts and the auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUserId(user.uid);
                const usersCollection = collection(db, "usersInfo");
                const userDocs = await getDocs(usersCollection);
                userDocs.forEach((doc) => {
                    if (doc.data().userId === user.uid) {
                        const userData = doc.data();
                        setName(userData.name || "");
                        setTelegram(userData.telegram || "");
                        setIsFemale(userData.isFemale || false);
                        setIsMale(userData.isMale || false);
                        setUploadedPhoto(userData.uploadedPhoto || null);
                        setCinemaddict(userData.cinemaddict || false);
                        setMusic(userData.music || false);
                        setBookworm(userData.bookworm || false);
                        setPolitics(userData.politics || false);
                        setSportsman(userData.sportsman || false);
                        setProcrastinate(userData.procrastinate || false);
                        setPromenade(userData.promenade || false);
                        setLookingForFemale(userData.lookingForFemale || false);
                        setLookingForMale(userData.lookingForMale || false);
                        setLookingForFriend(userData.lookingForFriend || false);
                        setLookingForLover(userData.lookingForLover || false);
                        setLookingForChat(userData.lookingForChat || false);
                        // setYears17(userData.years17 || true);
                        // setYears20(userData.years20 || false);
                        // setYears23(userData.years23 || true);
                        // setYears25(userData.years25 || false);
                        setExpectation(userData.expectation || "");
                        setAgreeToShare(userData.agreeToShare || false);
                    }
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        setUploadedPhoto(URL.createObjectURL(file));
    };

    // Function to add user data to Firestore
    const onSubmitInfo = async (userData) => {
        try {
            await addDoc(collection(db, "usersInfo"), userData);
            console.log("Document successfully written!");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleGoBack = () => {
        history.goBack();
      };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!userId) {
            alert("You must be logged in to submit your information.");
            return;
        }
        if (!agreeToShare) {
            alert("You must agree to share your information to submit.");
            return;
        }
        if (!name) {
            alert("Please enter your name.");
            return;
        }
        if (!telegram) {
            alert("Please enter your Telegram username.");
            return;
        }
        if (!expectation) {
            alert("Please enter your expectation.");
            return;
        }

        console.log("Trying to delete doc with id: ", userId);
        try {
            const usersCollection = collection(db, "usersInfo");
            const userDocs = await getDocs(usersCollection);
            userDocs.forEach(async (doc) => {
                if (doc.data().userId === userId) {
                    await deleteDoc(doc.ref);
                }
            });
        } catch (e) {
            console.error("Error fetching document: ", e);
        }

        const userData = {
            userId,
            name,
            telegram,
            isFemale,
            isMale,
            uploadedPhoto,
            cinemaddict,
            music,
            bookworm,
            politics,
            sportsman,
            procrastinate,
            promenade,
            lookingForFemale,
            lookingForMale,
            lookingForFriend,
            lookingForLover,
            lookingForChat,
            // years17,
            // years20,
            // years23,
            // years25,
            expectation,
            agreeToShare,
        };
        await onSubmitInfo(userData);
        alert("Your information has been submitted!");

    };

    return (
        <main>
            <div className={styles.content_tell_about}>
                <h2 id={styles.tell_about_title}> Tell about yourself! </h2>
                <form onSubmit={handleSubmit} id={styles.form_tell_about}>
                    {/* User */}
                    <section className={styles.user_info}>
                        {/* Left section */}
                        <div className={styles.left_section}>
                            <div id={styles.name_contact}>
                                <input
                                    type="text"
                                    id={styles.name}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="What is your name?"
                                />
                                <input
                                    type="text"
                                    id={styles.contact}
                                    value={telegram}
                                    onChange={(e) =>
                                        setTelegram(e.target.value)
                                    }
                                    placeholder="Your contact (Telegram):"
                                />
                            </div>

                            <div id={styles.sex}>
                                <div id={styles.sex_f}>
                                    <input
                                        type="radio"
                                        id={styles.sex_female}
                                        name="gender"
                                        checked={isFemale}
                                        onChange={() => {
                                            setIsFemale(true);
                                            setIsMale(false);
                                        }}
                                    />
                                    <label htmlFor={styles.sex_female}>
                                        I am a lady
                                    </label>
                                    <i className="fa-solid fa-venus"></i>
                                </div>

                                <div id={styles.sex_m}>
                                    <input
                                        type="radio"
                                        id={styles.sex_male}
                                        name="gender"
                                        checked={isMale}
                                        onChange={() => {
                                            setIsFemale(false);
                                            setIsMale(true);
                                        }}
                                    />
                                    <label htmlFor={styles.sex_male}>
                                        I am a gentleman
                                    </label>
                                    <i className="fa-solid fa-mars"></i>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hobbies */}
                    <div id={styles.hobbies}>
                        <div className={styles.hobbie} id={styles.hobbie1}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_film}
                                checked={cinemaddict}
                                onChange={(e) =>
                                    setCinemaddict(e.target.checked)
                                }
                            />
                            <label htmlFor={styles.hobbies_film}>
                                I am cinemaddict
                            </label>
                            <i className="fa-solid fa-film"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie2}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_music}
                                checked={music}
                                onChange={(e) => setMusic(e.target.checked)}
                            />
                            <label htmlFor={styles.hobbies_music}>
                                I am music lover
                            </label>
                            <i className="fa-solid fa-music"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie3}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_read}
                                checked={bookworm}
                                onChange={(e) => setBookworm(e.target.checked)}
                            />
                            <label htmlFor={styles.hobbies_read}>
                                I am bookworm
                            </label>
                            <i className="fa-solid fa-book"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie7}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_politics}
                                checked={politics}
                                onChange={(e) => setPolitics(e.target.checked)}
                            />
                            <label htmlFor={styles.hobbies_politics}>
                                I am interested in politics
                            </label>
                            <i className="fa-solid fa-globe"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie4}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_sport}
                                checked={sportsman}
                                onChange={(e) => setSportsman(e.target.checked)}
                            />
                            <label htmlFor={styles.hobbies_sport}>
                                I am a sportsman/woman
                            </label>
                            <i className="fa-solid fa-dumbbell"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie5}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_procrastinate}
                                checked={procrastinate}
                                onChange={(e) =>
                                    setProcrastinate(e.target.checked)
                                }
                            />
                            <label htmlFor={styles.hobbies_procrastinate}>
                                I like to procrastinate
                            </label>
                            <i className="fa-solid fa-bed"></i>
                        </div>
                        <div className={styles.hobbie} id={styles.hobbie6}>
                            <input
                                type="checkbox"
                                id={styles.hobbies_walk}
                                checked={promenade}
                                onChange={(e) => setPromenade(e.target.checked)}
                            />
                            <label htmlFor={styles.hobbies_walk}>
                                I am keen of promenade
                            </label>
                            <i className="fa-solid fa-walking"></i>
                        </div>
                    </div>

                    {/* User interest */}
                    <section className={styles.user_interest_info}>
                        <p id={styles.text_header}>Who are you looking for?</p>
                        <div className={styles.user_interest}>
                            <div className={styles.search}>
                                <div id={styles.search_f}>
                                    <input
                                        type="checkbox"
                                        id={styles.search_female}
                                        checked={lookingForFemale}
                                        onChange={(e) =>
                                            setLookingForFemale(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label htmlFor={styles.search_female}>
                                        I am looking for a beautiful lady
                                    </label>
                                    <i className="fa-solid fa-venus"></i>
                                </div>

                                <div id={styles.search_m}>
                                    <input
                                        type="checkbox"
                                        id={styles.search_male}
                                        checked={lookingForMale}
                                        onChange={(e) =>
                                            setLookingForMale(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.search_male}>
                                        I am looking for a handsome gentleman
                                    </label>
                                    <i className="fa-solid fa-mars"></i>
                                </div>
                            </div>

                            {/* <div className={styles.range_field}>
                                <div id={styles.range_1}>
                                    <input
                                        type="checkbox"
                                        id={styles.range_first}
                                        checked={years17}
                                        onChange={(e) =>
                                            setYears17(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.range1}>
                                        17-20 y.o.
                                    </label>
                                </div>
                                <div id={styles.range_2}>
                                    <input
                                        type="checkbox"
                                        id={styles.range_second}
                                        checked={years20}
                                        onChange={(e) =>
                                            setYears20(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.range2}>
                                        20-23 y.o.
                                    </label>
                                </div>
                                <div id={styles.range_3}>
                                    <input
                                        type="checkbox"
                                        id={styles.range_third}
                                        checked={years23}
                                        onChange={(e) =>
                                            setYears23(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.range3}>
                                        23-25 y.o.
                                    </label>
                                </div>
                                <div id={styles.range_4}>
                                    <input
                                        type="checkbox"
                                        id={styles.range_fourth}
                                        checked={years25}
                                        onChange={(e) =>
                                            setYears25(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.range4}>
                                        25-27+ y.o.
                                    </label>
                                </div>
                            </div> */}

                            <div className={styles.looking_for}>
                                <div id={styles.looking_f}>
                                    <input
                                        type="checkbox"
                                        id={styles.search_friend}
                                        checked={lookingForFriend}
                                        onChange={(e) =>
                                            setLookingForFriend(
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label htmlFor={styles.search_friend}>
                                        I need a good friend
                                    </label>
                                    <i className="fa-regular fa-handshake"></i>
                                </div>
                                <div id={styles.looking_l}>
                                    <input
                                        type="checkbox"
                                        id={styles.search_lover}
                                        checked={lookingForLover}
                                        onChange={(e) =>
                                            setLookingForLover(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.search_lover}>
                                        I need a passionate lover
                                    </label>
                                    <i className="fa-solid fa-hand-holding-heart"></i>
                                </div>
                                <div id={styles.looking_c}>
                                    <input
                                        type="checkbox"
                                        id={styles.search_chat}
                                        checked={lookingForChat}
                                        onChange={(e) =>
                                            setLookingForChat(e.target.checked)
                                        }
                                    />
                                    <label htmlFor={styles.search_chat}>
                                        I just want to chat with someone
                                    </label>
                                    <i className="fa-solid fa-hand-peace"></i>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Expectation */}
                    <textarea
                        id={styles.expectation}
                        rows="2"
                        cols="10"
                        value={expectation}
                        onChange={(e) => setExpectation(e.target.value)}
                        placeholder="What do you expect from communication?"></textarea>

                    {/* Agree to share */}
                    <div className={styles.agree_field}>
                        <div id={styles.agree_share}>
                            <input
                                type="checkbox"
                                id={styles.agree}
                                checked={agreeToShare}
                                onChange={(e) =>
                                    setAgreeToShare(e.target.checked)
                                }
                            />
                            <label htmlFor={styles.agree}>
                                I agree to share my info
                            </label>
                        </div>
                        <button id={styles.button_save} type="submit">
                            Save
                        </button>
                    </div>
                </form>
                <button id={styles.button_back} type="button" onClick={handleGoBack}>
                    Back
                </button>
            </div>
        </main>
    );
}

export default TellAbout;
