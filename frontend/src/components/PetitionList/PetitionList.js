import PetitionCard from "../PetitionCard/PetitionCard";
import styles from "./PetitionList.module.css";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function PetitionList(props){

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
                {props.petitions.length == 0 && <div>There are no petitions.</div>}
                {props.petitions.map((petition, index) => {
                    return <Link to={`/petition/${petition._id}`}><PetitionCard key={index} data={petition}></PetitionCard></Link>
                })}
            </div>
        </div>
    )
}

export default PetitionList;