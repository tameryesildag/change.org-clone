import styles from "./PetitionForm.module.css";
import { useRef, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import usePost from "../../hooks/usePost";

function PetitionForm(props) {
    
    const navigate = useNavigate();

    const authValues = useContext(AuthContext);

    const postRequest = usePost();

    const titleRef = useRef();
    const descriptionRef = useRef();

    function submitHandler(event){
        event.preventDefault();
        postRequest(process.env.REACT_APP_HOST + "/petition", {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        }, authValues.token);
    }

    return (
        <form onSubmit={submitHandler}  className={styles["petition-form"]}>
            <div className={styles.fields}>
                <div className={styles.field}>
                    <input ref={titleRef} placeholder="Title" name="title" className={styles["title-input"]}></input>
                </div>
                <div className={styles.field}>
                    <textarea ref={descriptionRef} cols={40} rows={5} placeholder="Description" name="description" className={styles["description-input"]}></textarea>
                </div>
                <button className={styles["red-button"]} >Start</button>
            </div>
        </form>
    )
}

export default PetitionForm;