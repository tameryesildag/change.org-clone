import useGet from "../../hooks/useGet";
import ReactLoading from "react-loading";
import PetitionList from "../../components/PetitionList/PetitionList";

function PetitionsPage(){

    const getRequest = useGet(process.env.REACT_APP_HOST + "/petitions");

    return(
        <div>
            {getRequest.isPending ? <ReactLoading type="bubbles" color="#808080"></ReactLoading> : <PetitionList petitions={getRequest.data.petitions}></PetitionList>}
        </div>
    )
}

export default PetitionsPage;