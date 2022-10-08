import styles from "./Slide.module.css";
import slideImage from "../../assets/slide.jpg";

function Slide(props){

    let description = props.data.description;
    if(description.length > 90) description = description.substring(0, 90) + "...";

    return(
        <div className={styles.slide}>
            <div className={styles["slide-image"]}>
                <img src={slideImage}></img>
                {props.selected ? <div className={styles["red-bar"]}></div> : <div className={styles["transparent-bar"]}></div>}
            </div>
            <div className={styles["slide-info"]}>
                {description}
            </div>
        </div>
    )
}

export default Slide;