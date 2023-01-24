import styles from "./PetitionPage.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import AuthContext from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import axios from "axios";
import petitionImage from "../../assets/petition.jpg";

function PetitionPage(props) {

    let { petitionId } = useParams();

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petition/" + petitionId);

    const authValues = useContext(AuthContext);

    const navigation = useNavigate();

    function onDeleteClick(event) {
        axios.delete(process.env.REACT_APP_HOST + "/petition/" + petitionId, { headers: { "token": authValues.token } }).then(response => {
            navigation("/", { replace: true });
        });
    }
    if (getRequest.isPending) {
        return <ReactLoading type="bubbles" color="#808080"></ReactLoading>
    }
    return (
        <div>
            <div className={styles["title-container"]}>
                <h1 className={styles.title}>{getRequest.data.petition.title}</h1>
            </div>
            <div className={styles["frame-container"]}>
                <div className={styles["left-frame"]}>
                    <div className={styles.petition}>
                        {
                            getRequest.data.petition.image &&
                            <div className={styles["image-container"]}>
                                <img src={process.env.REACT_APP_HOST + "/images/" + getRequest.data.petition.image}></img>
                            </div>
                        }
                        <p className={styles.description}>{getRequest.data.petition.description}</p>
                        <div className={styles["author-container"]}>
                            <Link to={"/user/" + getRequest.data.petition.creator._id}>
                                <div className={styles.author}>{getRequest.data.petition.creator.firstName + " " + getRequest.data.petition.creator.lastName}</div>
                            </Link>
                        </div>
                        {(() => {
                            if (getRequest.isPending) return;
                            else {
                                if (!authValues.user) return;
                                if (getRequest.data.petition.creator._id == authValues.user._id) {
                                    return <div onClick={onDeleteClick} className={styles["delete-button"]}>Delete Petition</div>
                                }
                            }
                        })()}

                    </div>
                </div>
                <div className={styles["right-frame"]}>
                    <div><b>{getRequest.data.petition.signs} people have signed.</b></div>
                </div>
            </div>
        </div>
    )
}

export default PetitionPage;