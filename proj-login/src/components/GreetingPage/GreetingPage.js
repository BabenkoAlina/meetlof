import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './GreetingPage.module.css';

const GreetingPage = () => {
    return (
        <div className={styles.main}>
            <Navbar isAuthenticated={false}/>
            <div className={styles.parent}>
                <div className={styles.page}>
                    <div>
                        <div className={`${styles['greeting-text']} ${styles['title']}`}>
                            <h1>Welcome to MeetLoF!</h1>
                            <h2>MeetLoF is an online community to find friends</h2>
                        </div>
                        <div className={styles['greeting-container']}>
                            <div className={styles['horizontal-images']}>
                                <img src="/friends.jpeg" alt="Friends" />
                                <img src="/couple.webp" alt="Couple" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Link to="/login">
                            <button className={styles['my-btn']}>
                                <span>Log In</span>
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className={styles['my-btn-1']}>
                                <span>Register</span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <h2 className={styles.title}>Explore useful tips!</h2>
                        <div className={styles['explore-topic']}>
                            <img src="/icebreakers.jpeg" alt="Ice breakers" />
                            <div className={styles['explore-table']}>
                                <h3 className={styles['explore-title']}>100 icebreaker questions</h3>
                                <p>
                                    Mural is a collaborative online platform that enhances team
                                    communication with fun and engaging icebreaker questions. It
                                    offers a wide range of icebreaker categories suitable for
                                    any team meeting or classroom setting. The website provides
                                    easy access to over 100 questions designed to help team
                                    members connect and communicate effectively.<br />
                                    <a href="https://www.mural.co/blog/icebreaker-questions">LINK</a>
                                </p>
                            </div>
                        </div>
                        <div className={styles['explore-topic']}>
                            <img src="/onlineconv.jpeg" alt="Online conversation" />
                            <div className={styles['explore-table']}>
                                <h3 className={styles['explore-title']}>How to Start a Conversation Online</h3>
                                <p>
                                    So you're trying to get to know someone. Email, dating sites
                                    and instant-messaging services may make it more convenient
                                    to communicate with our friends and family, but it can be
                                    hard to get to know a new person when you aren't speaking
                                    face-to-face. More and more people are meeting their
                                    friends, partners, and spouses on the Internet, and here's
                                    the thing: it's awkward for everyone! Be curious, but not
                                    pushy; relax, and try to be yourself. More here:<br />
                                    <a href="https://www.wikihow.com/Start-a-Conversation-Online">LINK</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default GreetingPage;
