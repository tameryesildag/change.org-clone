import styles from "./PetitionPage.module.css";
import { useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";

function PetitionPage(props) {

    let { petitionId } = useParams();

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petition/" + petitionId);

    return (
        <div className={styles["petition-container"]}>
                {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> :
                    <div className={styles.petition}>
                        <div className={styles["title-container"]}>
                            <h1 className={styles.title}>{getRequest.data.petition.title}</h1>
                        </div>
                        <p className={styles.description}>{getRequest.data.petition.description}</p>
                        <div className={styles["author-container"]}>
                            <div className={styles.author}>{getRequest.data.petition.creator.firstName + " " + getRequest.data.petition.creator.lastName}</div>
                        </div>
                    </div>
                }
        </div>
    )
}

export default PetitionPage;