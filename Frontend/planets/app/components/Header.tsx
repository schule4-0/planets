import React from 'react';
import styles from './Header.module.css'; 


const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src="/logo.png" alt="Logo" className={styles.logo} />
                <div className={styles.title}>
                    Planeten Entdecker
                </div>
            </div>
            <nav className={styles.menu}>
                <div className={styles.menuItem}>
                    <a href="#" className={styles.menuLink}>Aufgaben</a>
                    <img src="/aufgaben.png" alt="Aufgaben" className={styles.menuLogo} />
                </div>
                <div className={styles.menuItem}>
                    <a href="#" className={styles.menuLink}>Spiele</a>
                    <img src="/spiele.png" alt="Spiele" className={styles.menuLogo} />
                </div>
                <div className={styles.burgerMenu}>
                    <img src="/hamburger-menu.png" alt="Menü" className={styles.burgerIcon} />
                </div>
            </nav>
        </header>
    );
}

export default Header;
