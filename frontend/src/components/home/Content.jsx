import DataAnalysis from '../logged-in/home/DataAnalysis'
import Introduction from '../guest/Introduction';
import { useAuth } from "../../context/authContext";
function Content(){
    const {token} = useAuth();
    return(
        <div className="w-4/5 bg-brand-light bg-opacity-90 mx-auto min-h-screen">
            {token && <DataAnalysis />}
            {!token && <Introduction />}
        </div>
    )
}

export default Content;