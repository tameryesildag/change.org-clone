import styles from "./Footer.module.css";

function Footer(){

    return(
        <footer className={styles.footer}>
            <div class={styles["column-container"]}>
                <ul>
                    <li className={styles.title}>Company</li>
                    <li>About</li>
                    <li>Impact</li>
                    <li>Careers</li>
                    <li>Team</li>
                </ul>
                <ul>
                    <li className={styles.title}>Community</li>
                    <li>Blog</li>
                    <li>Press</li>
                    <li>Community Guidelines</li>
                </ul>
                <ul>
                    <li className={styles.title}>Support</li>
                    <li>Help</li>
                    <li>Guides</li>
                    <li>Privacy</li>
                    <li>Policies</li>
                    <li>Cookies</li>
                </ul>
                <ul>
                    <li className={styles.title}>Connect</li>
                    <li>Twitter</li>
                    <li>Facebook</li>
                    <li>Instagram</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;