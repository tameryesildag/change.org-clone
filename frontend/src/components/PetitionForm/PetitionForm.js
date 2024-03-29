import styles from "./PetitionForm.module.css";
import { useRef, useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import usePost from "../../hooks/usePost";
import axios from "axios";
import ModalContext from "../../contexts/ModalContext";
import { useNavigate } from "react-router-dom";

function PetitionForm(props) {

    const authValues = useContext(AuthContext);
    const modalValues = useContext(ModalContext);

    const postRequest = usePost();

    const [file, setFile] = useState(null);

    const titleRef = useRef();
    const descriptionRef = useRef();

    const navigation = useNavigate();

    function submitHandler(event){

        event.preventDefault();

        const formData = new FormData();

        formData.append("image", file);

        formData.append("title", titleRef.current.value);

        formData.append("description", descriptionRef.current.value);

        axios.post(process.env.REACT_APP_HOST + "/petition", formData, {headers: {"token": authValues.token}}).then(response => {
            modalValues.showModal("Petition has been created.");
            navigation("/");
        });
    }

    function onFileChange(event){
        setFile(event.target.files[0]);
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
                <div className={styles.field}>
                    <input name="image" onChange={onFileChange} type="file"></input>
                </div>
                <button className={styles["red-button"]} >Start</button>
            </div>
        </form>
    )
}

export default PetitionForm;