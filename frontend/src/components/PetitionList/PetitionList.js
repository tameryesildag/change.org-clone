import PetitionCard from "../PetitionCard/PetitionCard";
import styles from "./PetitionList.module.css";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function PetitionList(props){
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