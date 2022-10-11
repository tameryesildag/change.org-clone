import PetitionForm from "../../components/PetitionForm/PetitionForm";
import styles from "./StartPetitionPage.module.css";

function StartPetitionPage(){
    return(
        <div className={styles["form-container"]}>
            <h1 className={styles["form-heading"]} >Start a Petition</h1>
            <PetitionForm></PetitionForm>
        </div>
    )
}

export default StartPetitionPage;