import styles from "./LoginForm.module.css";
import usePost from "../../hooks/usePost";
import { useRef, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function LoginForm(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const postRequest = usePost();

    const authValues = useContext(AuthContext);

    async function submitHandler(event) {
        event.preventDefault();
        const resData = await postRequest(process.env.REACT_APP_HOST + "/login", {email: emailRef.current.value, password: passwordRef.current.value});
        if(resData.token){
            authValues.setToken(resData.token);
            authValues.setUser(resData.user);
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles["login-form"]}>
            {authValues.user && (<Navigate to="/"></Navigate>)}
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input name="email" ref={emailRef} className={styles["email-input"]} placeholder="Email"></input>
                </div>
                <div className={styles.field}>
                    <input type="password" name="password" ref={passwordRef} className={styles["password-input"]} placeholder="Password"></input>
                </div>
                <button  className={styles["red-button"]}>Login</button>
            </div>
        </form>
    )
}

export default LoginForm;