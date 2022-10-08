import styles from "./Slider.module.css";
import slideImage from "../../assets/slide.jpg";
import Slide from "../Slide/Slide";
import BigSlide from "../BigSlide/BigSlide";
import backImage from "../../assets/back.png";
import nextImage from "../../assets/next.png";
import { useState } from "react";

const slides = [
    {
        title: "Müjde! Can Candan Boğaziçi Üniversitesine dönüyor!",
        description: 'Kayyum rektör Prof. Dr. Naci İnci tarafından mesnetsiz gerekçelerle "işine son verildiği" tarafına iletilen … ',
        creator: "Sonay Ban",
        supporters: 12321
    },
    {
        title: "Başardık!! NCLEX Sınavı artık Türkiye'de yapılacak!",
        description: "Merhabalar, Yaklaşık 2-3 Ay önce @gocmenhemsire telegram grubu aracılığı ile NCLEX sınavının Türkiye'de yapılmasına yönelik açtığımız Change.Org kampanyamız başarıya ulaştı. Sınavın Türkiye'de yapılmasına",
        creator: "Metin S",
        supporters: 8323
    },
    {
        title: "Galata Kulesi'nin kuşları yaşayacak.",
        description: "Galata Kulesi restorasyonu, kule çevresinde yuva yapan kuşların üreme dönemine denk geldiği için ertelendi.",
        creator: "Simurg Kuş Y",
        supporters: 58232
    },
    {
        title: "Phaselis Antik Kenti Kurtuldu.",
        description: "95.000 kere teşekkürler! Phaselis İnisiyatifi'nin yürüttüğü imza kampanyası sonucunda Phaselis Antik Kenti kurtuldu! Bölgeye yapılması planlanan otel projesi, Orman ve Su İşleri Bakanlığı tarafından iptal edildi.",
        creator: "Melike Vergili",
        supporters: 53243
    },
    {
        title: "Kamilet Vadisi geleceğimiz için var olmaya devam edecek...",
        description: "Kamilet Vadisi'ni yıllarca yöre halkından başka ne duyan ne de gören olmadı. Suları kendi halinde aktı, ağaçları kendi halinde büyüdü. Teknoloji, modern hayat canavarları onu ve sularını keşfedene kadar. Ağızlarının suyu akmaya …",
        creator: "hatice kestane can",
        supporters: 28856
    },
    {
        title: "Geyikbayırı Tırmanış Bölgesi'ne verilen maden arama ruhsatı iptal edildi",
        description: "Dünyamızın en değerli ve en çok sevilen ilk 10 kaya tırmanış bölgesi arasında yer alan, senede 10 bin yabancı turistin ziyaret ettiği Geyikbayırı spor tırmanış bölgesi kayalarına 04.12.2014 tarihinde 21400418 numaralı maden arama ruhsatı verilmiştir. Bu kayalarda son 15 yıl içerisinde yaklaşık 1000 tırmanış rotası hazırlanmış ve eko turizm bölgesi ilan edilerek kış turizmine önemli bir katkı sağlamayı başarmıştır.",
        creator: "Zuleyha Gorken",
        supporters: 19425
    }
]

const slideCount = 6;

function Slider(props){

    const [selectedSlide, setSelectedSlide] = useState(0);

    function backOnClick(){
        let newValue = selectedSlide - 1;
        if(newValue < 0){
            newValue = slideCount + newValue;
        }
        setSelectedSlide(newValue);
    }

    function nextOnClick(){
        let newValue = selectedSlide + 1;
        if(newValue > (slideCount - 1)){
            newValue = newValue - slideCount;
        }
        setSelectedSlide(newValue);
    }

    return(
        <div className={styles["slide-show"]}>
            <div className={styles["slide-control"]}>
                <div className={styles["back-button"]}>
                    <img onClick={backOnClick} src={backImage}></img>
                </div>
                    <BigSlide data={slides[selectedSlide]}></BigSlide>
                <div className={styles["next-button"]}>
                    <img onClick={nextOnClick} src={nextImage}></img>
                </div>
            </div>
            <div className={styles["slide-container"]}>
                {slides.map((slide, index) => {
                    let selected = false;
                    if(index == selectedSlide) selected = true;
                    return <Slide key={index} data={slide} selected={selected}></Slide>
                })}
            </div>
        </div>
    )
}

export default Slider;