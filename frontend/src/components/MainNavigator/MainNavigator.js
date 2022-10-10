import { Link } from "react-router-dom";
import styles from "./MainNavigator.module.css";
import logo from "../../assets/navlogo.png";
import searchLogo from "../../assets/searchlogo.png";

function MainNavigator() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo}></img>
                    </Link>
                </div>
                <ul className={styles["nav-list-left"]}>
                    <li>
                        <Link to="/start-a-petition">Start a Petition</Link>
                    </li>
                    <li>
                        <Link to="/user/me">My Petitions</Link>
                    </li>
                    <li>
                        <Link to="/petitions">Browse</Link>
                    </li>
                    <li>
                        <Link to="/">Membership</Link>
                    </li>
                </ul>
                <ul className={styles["nav-list-right"]}>
                    <li>
                        <Link to="/search">
                            <img className={styles["search-logo"]} src={searchLogo}></img>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login-or-register">Log in</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigator;