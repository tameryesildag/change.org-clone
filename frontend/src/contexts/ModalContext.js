import { createContext, useState } from "react";

const ModalContext = createContext({modalOpen: false, modalDescription: null});


export function ModalProvider(props){
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState(null);

    function showModal(description){
        setModalDescription(description);
        setModalOpen(true);
        console.log("Modal has been showed");
    }

    return <ModalContext.Provider value={{showModal, modalOpen, setModalOpen, modalDescription}}>{props.children}</ModalContext.Provider>
}

export default ModalContext;