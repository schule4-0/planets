import React from 'react';
import styles from './HeaderSubpage.module.css'; 

const HeaderSubpage: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__logoContainer}>
                <img src="/images/logo.png" alt="Logo" className={styles.header__logo} />
                <div className={styles.header__title}>
                    Planeten Entdecker
                </div>
            </div>
            <nav className={styles.menu}>
                <div className={styles.menuItem}>
                    <a href="#" className={styles.menuLink}>Aufgaben</a>
                    <img src="/images/aufgaben.png" alt="Aufgaben" className={styles.menuLogo} />
                </div>
                <div className={styles.menuItem}>
                    <a href="#" className={styles.menuLink}>Spiele</a>
                    <img src="/images/spiele.png" alt="Spiele" className={styles.menuLogo} />
                </div>
                <div className={styles.burgerMenu}>
                    <img src="/images/hamburger-menu.png" alt="Menü" className={styles.burgerIcon} />
                </div>
            </nav>
        </header>
    );
}

export default HeaderSubpage;
