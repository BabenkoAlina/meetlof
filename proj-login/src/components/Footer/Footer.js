import React from 'react';
import styles from './Footer.module.css'; // Import the CSS module for styling

const Footer = () => {
    return (
        <footer className={`${styles.footer} ${styles['d-flex']} ${styles['justify-content-between']} ${styles['align-items-end']}`}>
            <div>
                <p>Contacts</p>
                <p>meetlof@gmail.com</p>
            </div>
            <div>
                <p>Social networks</p>
                <div className={`${styles['d-flex']} ${styles['flex-column']}`}>
                    <a href="https://www.instagram.com/meetlof?igsh=MXBxdDU1NzB6M3VtZQ==" target="_blank" className={styles['mr-2']}>
                        <img src="/instagram.png" alt="Instagram" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
