import styles from "./RegisterForm.module.css";
import { useContext, useRef } from "react";
import usePost from "../../hooks/usePost";
import {redirect} from "react-router-dom"
import axios from "axios";
import ModalContext from "../../contexts/ModalContext";

function RegisterForm(props) {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();    

    const postRequest = usePost();

    const modalValues = useContext(ModalContext);

    async function submitHandler(event){
        event.preventDefault();
        axios.post(process.env.REACT_APP_HOST + "/register", {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }).then(response => {
            modalValues.showModal("User has been created.");
            props.setFormType("login");
        }).catch(err => {
            modalValues.showModal("There was an error creating the user.");
        });
    }

    return (
        <form onSubmit={submitHandler} className={styles["register-form"]}>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input ref={firstNameRef} name="firstName" placeholder="First Name" className={styles["first-name-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input ref={lastNameRef} name="lastName" placeholder="Last Name" className={styles["last-name-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input ref={emailRef} name="email" placeholder="Email" className={styles["email-input"]}></input>
                </div>
                <div className={styles.field}>
                    <input ref={passwordRef} name="password" placeholder="Password" className={styles["password-input"]}></input>
                </div>
                <button className={styles["red-button"]}>Sign Up</button>
            </div>
        </form>
    )
}

export default RegisterForm;