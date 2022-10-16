import PetitionCard from "../PetitionCard/PetitionCard";
import styles from "./Feed.module.css";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function Feed(props){

    let url = process.env.REACT_APP_HOST;

    if(props.userId){
        url += "/user-petitions/" + props.userId;
    } else {
        url += "/petitions";
    }

    const getRequest = useGet(url);

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