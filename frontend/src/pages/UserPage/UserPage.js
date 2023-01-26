import { useContext } from "react";
import { useParams } from "react-router-dom";
import PetitionList from "../../components/PetitionList/PetitionList";
import AuthContext from "../../contexts/AuthContext";
import useGet from "../../hooks/useGet";
import styles from "./UserPage.module.css";
import ReactLoading from "react-loading";

function UserPage() {

    let { userId } = useParams();

    let authvalues = useContext(AuthContext);

    if (userId == "me") {
        userId = authvalues.user._id.toString();
    }

    const petitionsRequest = useGet(process.env.REACT_APP_HOST + "/user-petitions/" + userId);

    const userRequest = useGet(process.env.REACT_APP_HOST + "/user/" + userId);
    //<ReactLoading type="bubbles" color="#808080"></ReactLoading>
    return (
        <div>
            {(() => {
                if (petitionsRequest.isPending | userRequest.isPending) return <ReactLoading type="bubbles" color="#808080"></ReactLoading>
                else return (
                <div>
                    <div className={styles["name-container"]}>
                        <h1>{userRequest.data.user.firstName + " " + userRequest.data.user.lastName}</h1>
                    </div>
                    <PetitionList petitions={petitionsRequest.data.petitions}></PetitionList>
                </div>
                )
            })()}
        </div>
    )
}

export default UserPage;