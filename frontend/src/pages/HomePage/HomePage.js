import styles from "./HomePage.module.css";
import background from "../../assets/background.jpg";
import Slider from "../../components/Slider/Slider";

function HomePage(props) {
    return (
        <div className={styles.content} style={{ backgroundImage: `url(${background})` }}>
            <h1 className={styles.heading}>The world's platform for change</h1>
            <h2 className={styles["sub-heading"]}>494,036,697 people taking action <div className={styles["red-text"]}>Victories every day.</div></h2>
            <button className={styles["start-button"]}>Start a petition</button>
            <Slider></Slider>
        </div>
    )
}

export default HomePage;