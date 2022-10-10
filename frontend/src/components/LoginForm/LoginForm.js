import styles from "./LoginForm.module.css";
import usePost from "../../hooks/usePost";
import { useRef } from "react";

function LoginForm(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const postRequest = usePost();

    function submitHandler(event) {
        event.preventDefault();
        postRequest(process.env.REACT_APP_HOST + "/login", {email: emailRef.current.value, password: passwordRef.current.value});
    }

    return (
        <form onSubmit={submitHandler} className={styles["login-form"]}>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input ref={emailRef} className={styles["email-input"]} placeholder="Email"></input>
                </div>
                <div className={styles.field}>
                    <input ref={passwordRef} className={styles["password-input"]} placeholder="Password"></input>
                </div>
                <button  className={styles["red-button"]}>Login</button>
            </div>
        </form>
    )
}

export default LoginForm;