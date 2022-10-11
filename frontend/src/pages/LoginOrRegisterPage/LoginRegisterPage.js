import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import styles from "./LoginRegisterPage.module.css";

function LoginRegisterPage(){

    const [formType, setFormType] = useState("login")

    function switchForm(){
        if(formType == "login") return setFormType("register");
        if(formType == "register") return setFormType("login");
    }


    if(formType == "login"){
        return(
            <div className={styles["form-container"]}>
                <h1 className={styles["form-heading"]}>Log in</h1>
                <p className={styles["form-info"]}>Don't have an account? <div className={styles["switch-link"]} onClick={switchForm}>Sign up</div></p>
                <LoginForm setFormType={setFormType} ></LoginForm>
            </div>
        )
    }

    if(formType == "register"){
        return(
            <div className={styles["form-container"]}>
                <h1 className={styles["form-heading"]}>Sign Up</h1>
                <p className={styles["form-info"]}>If you have an account <div className={styles["switch-link"]} onClick={switchForm}>Log in</div></p>
                <RegisterForm setFormType={setFormType}></RegisterForm>
            </div>
        )
    }

}

export default LoginRegisterPage;