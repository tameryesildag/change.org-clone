import styles from "./HomePage.module.css";
import background from "../../assets/background.jpg";
import Slider from "../../components/Slider/Slider";
import PetitionList from "../../components/PetitionList/PetitionList";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function HomePage(props) {

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petitions");

    return (
        <div className={styles.content} style={{ backgroundImage: `url(${background})` }}>
            <h1 className={styles.heading}>The world's platform for change</h1>
            <h2 className={styles["sub-heading"]}>494,036,697 people taking action <div className={styles["red-text"]}>Victories every day.</div></h2>
            <Link to="/start-a-petition">
                <button className={styles["start-button"]}>Start a petition</button>
            </Link>
            <Slider></Slider>
            <div className={styles["feed-heading"]}>
                What's happening on Change.org
            </div>
            {(()=>{
                if(getRequest.isPending){
                    <ReactLoading type="bubbles" color="#808080"></ReactLoading>
                } else {
                    if(getRequest.data.petitions.length == 0) return <div>There are no petitions.</div>
                    else{
                       return <PetitionList petitions={getRequest.data.petitions}></PetitionList>
                    }
                }
            })()}
        </div>
    )
}

export default HomePage;