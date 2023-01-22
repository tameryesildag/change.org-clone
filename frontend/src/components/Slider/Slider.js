import styles from "./Slider.module.css";
import slideImage from "../../assets/slide.jpg";
import Slide from "../Slide/Slide";
import BigSlide from "../BigSlide/BigSlide";
import backImage from "../../assets/back.png";
import nextImage from "../../assets/next.png";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";

let slideCount = 6;

function Slider(props) {

    const [selectedSlide, setSelectedSlide] = useState(0);

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petitions");

    useEffect(() => {
        alert("useEffect");
        if(!getRequest.isPending){
            slideCount = Math.min(6, getRequest.data.petitions.length); 
        }
    }, [getRequest])

    function backOnClick() {
        let newValue = selectedSlide - 1;
        if (newValue < 0) {
            newValue = slideCount + newValue;
        }
        setSelectedSlide(newValue);
    }

    function nextOnClick() {
        let newValue = selectedSlide + 1;
        if (newValue > (slideCount - 1)) {
            newValue = newValue - slideCount;
        }
        setSelectedSlide(newValue);
    }

    return (
        <div className={styles["slide-show"]}>
            <div className={styles["slide-control"]}>
                <div className={styles["back-button"]}>
                    <img onClick={backOnClick} src={backImage}></img>
                </div>
                {(() => {
                    if(getRequest.isPending){
                        return <ReactLoading type="bubbles" color="#808080"></ReactLoading>
                    } else {
                        if(getRequest.data.petitions.length == 0) return <div>There are no petitions.</div>;
                        else {
                            return <BigSlide data={getRequest.data.petitions[selectedSlide]}></BigSlide>
                        }
                    }
                })()}
                <div className={styles["next-button"]}>
                    <img onClick={nextOnClick} src={nextImage}></img>
                </div>
            </div>
            <div className={styles["slide-container"]}>
                {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> : getRequest.data.petitions.map((slide, index) => {
                    let selected = false;
                    if (index == selectedSlide) selected = true;
                    return <Slide key={index} data={slide} selected={selected}></Slide>
                })}
            </div>
        </div>
    )
}

export default Slider;