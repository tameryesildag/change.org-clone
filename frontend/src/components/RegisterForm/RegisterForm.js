import styles from "./RegisterForm.module.css";

function RegisterForm() {
    return (
        <form className={styles["register-form"]}>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input name="firstName" placeholder="First Name" className={styles["first-name-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input name="lastName" placeholder="Last Name" className={styles["last-name-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input name="email" placeholder="Email" className={styles["email-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input name="password" placeholder="Password" className={styles["password-input"]}></input>
                </div>
                <button className={styles["red-button"]}>Sign Up</button>
            </div>
        </form>
    )
}

export default RegisterForm;