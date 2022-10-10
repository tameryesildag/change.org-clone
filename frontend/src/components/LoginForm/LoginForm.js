import styles from "./LoginForm.module.css";

function LoginForm(props) {
    return (
        <form className={styles["login-form"]}>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input className={styles["email-input"]} placeholder="Email"></input>
                </div>
                <div className={styles.field}>
                    <input className={styles["password-input"]} placeholder="Password"></input>
                </div>
                <button className={styles["red-button"]}>Login</button>
            </div>
        </form>
    )
}

export default LoginForm;