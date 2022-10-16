import PetitionCard from "../PetitionCard/PetitionCard";
import styles from "./Feed.module.css";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function Feed(props){

    let body = {};

    if(props.userId){
        body.userId = props.userId;
    }

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petitions", body);

    return(
        <div className={styles.feed}>
            <div className={styles["petition-container"]}>
                {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> : getRequest.data.petitions.map((petition, index) => {
                    return <Link to={`/petition/${petition._id}`}><PetitionCard key={index} data={petition}></PetitionCard></Link>
                })}
                {getRequest.error ? <p>Couldn't get the data.</p> : null}
            </div>
        </div>
    )
}

export default Feed;