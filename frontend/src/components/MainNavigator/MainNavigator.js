import { Link } from "react-router-dom";
import styles from "./MainNavigator.module.css";
import logo from "../../assets/navlogo.png";
import searchLogo from "../../assets/searchicon.png";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import userImage from "../../assets/user.png";

function MainNavigator() {

    const authValues = useContext(AuthContext);

    function logoutHandler() {
        authValues.setToken(null);
    }

    function dropdownHandler() {
        let element = document.getElementById("dropdown-content");
        console.log(element.style.display);
        if(element.style.display === "block") return element.style.display = "none";
        element.style.display = "block";
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles["logo-container"]}>
                    <Link to="/">
                        <img src={logo}></img>
                    </Link>
                </div>
                <ul className={styles["nav-list-left"]}>
                    <li>
                        {authValues.token ? <Link to="/start-a-petition">Start a Petition</Link> : <Link to="/login-or-register">Start a Petition</Link>}
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
                            <img className={styles["search-icon"]} src={searchLogo}></img>
                        </Link>
                    </li>
                    <li>
                        {authValues.token ? <div id="dropdown" onClick={dropdownHandler} className={styles.dropdown}>
                            <img className={styles["profile-icon"]} src={userImage}></img>
                            <div id="dropdown-content" className={styles["dropdown-content"]}>
                                <p className={styles["dropdown-button"]}>My Petitions</p>
                                <p className={styles["dropdown-button"]}>Settings</p>
                                <hr></hr>
                                <p>{authValues.user.firstName + " " + authValues.user.lastName}</p>
                                <p className={styles["logout-button"]} onClick={logoutHandler}>Log out</p>
                            </div>
                        </div> : <Link to="/login-or-register">Log in</Link>}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigator;