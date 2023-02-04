import styles from "./LoginForm.module.css";
import usePost from "../../hooks/usePost";
import { useRef, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import ModalContext from "../../contexts/ModalContext";
import axios from "axios";

function LoginForm(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const postRequest = usePost();

    const authValues = useContext(AuthContext);

    const modalValues = useContext(ModalContext);

    async function submitHandler(event) {
        event.preventDefault();
        axios.post(process.env.REACT_APP_HOST + "/login", {email: emailRef.current.value, password: passwordRef.current.value}).then(response => {
            authValues.setToken(response.data.token);
            authValues.setUser(response.data.user);
        }).catch(err => {
            modalValues.showModal(err.response.data.error);
        });
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