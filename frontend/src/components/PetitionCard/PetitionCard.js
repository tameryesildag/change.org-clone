import styles from "./PetitionCard.module.css";
import petitionImage from "../../assets/petition.jpg";

function PetitionCard(props) {

    let description = props.data.description;

    if(description.length > 400){
        description = description.substring(0, 400) + "...";
    }

    return (
        <div className={styles["petition-card"]}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {props.data.title}
                    </div>
                    <div className={styles.description}>
                        {description}
                    </div>
                </div>
                <div className={styles.image}>
                    <img src={petitionImage}></img>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.creator}>
                    {props.data.creator.firstName + " " + props.data.creator.lastName}
                </div>
                <div className={styles.supporters}>
                    <b>{props.data.signs}</b> Supporters
                </div>
            </div>
        </div>
    )
}

export default PetitionCard;