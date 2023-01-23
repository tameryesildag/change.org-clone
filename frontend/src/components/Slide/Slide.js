import styles from "./Slide.module.css";
import petitionImage from "../../assets/petition.jpg";

function Slide(props){

    let description = props.data.description;
    if(description.length > 90) description = description.substring(0, 90) + "...";

    return(
        <div className={styles.slide}>
            <div className={styles["slide-image"]}>
                <img src={props.data.image ? (process.env.REACT_APP_HOST + "/images/" + props.data.image) : petitionImage}></img>
                {props.selected ? <div className={styles["red-bar"]}></div> : <div className={styles["transparent-bar"]}></div>}
            </div>
            <div className={styles["slide-info"]}>
                {description}
            </div>
        </div>
    )
}

export default Slide;