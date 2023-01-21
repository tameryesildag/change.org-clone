import styles from "./PetitionPage.module.css";
import { Link, useParams } from "react-router-dom";
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
                        <Link to={"/user/" + getRequest.data.petition.creator._id}>
                            <div className={styles.author}>{getRequest.data.petition.creator.firstName + " " + getRequest.data.petition.creator.lastName}</div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default PetitionPage;