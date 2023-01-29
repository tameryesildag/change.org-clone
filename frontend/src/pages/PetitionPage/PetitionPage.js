import styles from "./PetitionPage.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import AuthContext from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import petitionImage from "../../assets/petition.jpg";
import ModalContext from "../../contexts/ModalContext";

function PetitionPage(props) {

    let { petitionId } = useParams();

    const authValues = useContext(AuthContext);

    const modalValues = useContext(ModalContext);

    const navigation = useNavigate();

    const [pending, setPending] = useState(true);

    const [petitionData, setPetitionData] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalDescription, setModalDescription] = useState("");

    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST + "/petition/" + petitionId).then(response => {
            setPetitionData(response.data.petition);
            setPending(false);
        })
    }, []);

    function onDeleteClick(event) {
        axios.delete(process.env.REACT_APP_HOST + "/petition/" + petitionId, { headers: { "token": authValues.token } }).then(response => {
            navigation("/", { replace: true });
        });
    }

    function onSignClick(event) {
        axios.post(process.env.REACT_APP_HOST + "/sign-petition/" + petitionId,null,{headers: {"token": authValues.token}}).then(response => {
            const newPetitionData = {...petitionData};
            newPetitionData.signs += 1;
            setPetitionData(newPetitionData);
        }).catch(err => {
            if(err.response){
                if(err.response.data.error){
                    modalValues.showModal(err.response.data.error);
                }
            }
        })
    }

    if (pending) {
        return <ReactLoading type="bubbles" color="#808080"></ReactLoading>
    }
    return (
        <div>
            <div className={styles["title-container"]}>
                <h1 className={styles.title}>{petitionData.title}</h1>
            </div>
            <div className={styles["frame-container"]}>
                <div className={styles["left-frame"]}>
                    <div className={styles.petition}>
                        {
                            petitionData.image &&
                            <div className={styles["image-container"]}>
                                <img src={process.env.REACT_APP_HOST + "/images/" + petitionData.image}></img>
                            </div>
                        }
                        <p className={styles.description}>{petitionData.description}</p>
                        <div className={styles["author-container"]}>
                            <Link to={"/user/" + petitionData.creator._id}>
                                <div className={styles.author}>{petitionData.creator.firstName + " " + petitionData.creator.lastName}</div>
                            </Link>
                        </div>
                        {(() => {
                            if (pending) return;
                            else {
                                if (!authValues.user) return;
                                if (petitionData.creator._id == authValues.user._id) {
                                    return <div onClick={onDeleteClick} className={styles["delete-button"]}>Delete Petition</div>
                                }
                            }
                        })()}

                    </div>
                </div>
                <div className={styles["right-frame"]}>
                    <div><b>{petitionData.signs} people have signed.</b></div>
                    <div onClick={onSignClick} className={styles["sign-button"]}>Sign this petition</div>
                </div>
            </div>
        </div>
    )
}

export default PetitionPage;