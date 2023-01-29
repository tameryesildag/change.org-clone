import styles from "./Modal.module.css";
import ModalContext from "../../contexts/ModalContext";
import { useContext } from "react";

function Modal(props){
    const modalValues = useContext(ModalContext);

    function onModalClick(event){
        modalValues.setModalOpen(false);
    }

    if(!modalValues.modalOpen) return(null);
    return(
        <div className={styles["dark-background"]}>
            <div className={styles["modal-container"]}>
                <div className={styles["modal"]}>
                    <div className={styles["modal-description"]}>
                        {modalValues.modalDescription}
                    </div>
                    <div className={styles["action-container"]}>
                        <button onClick={onModalClick} className={styles["close-button"]}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;