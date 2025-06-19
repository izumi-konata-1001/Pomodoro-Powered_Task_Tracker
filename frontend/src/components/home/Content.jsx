import DataAnalysis from '../logged-in/home/DataAnalysis'
import Introduction from '../guest/Introduction';
import { useAuth } from "../../context/authContext";
function Content(){
    const {token} = useAuth();
    return(
        <div>
            {token && <DataAnalysis />}
            {!token && <Introduction />}
        </div>
    )
}

export default Content;