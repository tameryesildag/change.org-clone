import styles from "./BigSlide.module.css";
import petitionImage from "../../assets/petition.jpg";
import userImage from "../../assets/user.png";

function BigSlide(props) {

    if (props.data.description.length > 200) {
        props.data.description = props.data.description.substring(0, 200) + "...";
    }

    return (
        <div className={styles["big-slide"]}>
            <div className={styles["big-image"]}>
                <img src={petitionImage}></img>
            </div>
            <div className={styles["big-info"]}>
                <div className={styles["top-info"]}>
                    <div className={styles.title}>
                        {props.data.title}
                    </div>
                    <div className={styles.description}>
                        {props.data.description}
                    </div>
                </div>
                <div className={styles["bottom-info"]}>
                    <div className={styles.creator}>
                        <div className={styles["profile-picture"]}>
                            <img src={userImage}></img>
                        </div>
                        <div className={styles["creator-name"]}>
                            {props.data.creator.firstName + " " +props.data.creator.lastName}
                        </div>
                    </div>
                    <div className={styles.supporters}>
                        <div className={styles["supporter-count"]}>
                            <b>{props.data.signs}</b> Supporters
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigSlide;