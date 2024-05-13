
import React from 'react';
import styles from './HeaderMain.module.css'; // CSS-Modul für Stilisierung

const HeaderMain: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src="/images/logo.png" alt="Logo" className={styles.logo} />
                <div className={styles.title}>
                    Planeten Entdecker
                </div>
            </div>
        </header>
    );
}

export default HeaderMain;

