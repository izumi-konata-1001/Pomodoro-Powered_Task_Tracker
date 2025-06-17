import { useNavigate } from "react-router-dom";

function BackButton(){
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return(
        <button type="button" onClick={handleBack}>back</button>
    )
}

export default BackButton;