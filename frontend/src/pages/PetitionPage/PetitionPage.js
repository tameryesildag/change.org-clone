import styles from "./PetitionPage.module.css";
import { useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";

function PetitionPage(props) {

    let { petitionId } = useParams();

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petition/" + petitionId);

    return (
        <div className={styles["petition-container"]}>
            <div className={styles.petition}>
                <div className={styles["title-container"]}>
                    {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> : <h1 className={styles.title}>{getRequest.data.petition.title}</h1>}
                </div>
                {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> : <p className={styles.description}>{getRequest.data.petition.description}</p>}
            </div>
        </div>
    )
}

export default PetitionPage;