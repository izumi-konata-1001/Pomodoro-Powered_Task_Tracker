import Introduction from "../guest/Introduction";
import DataAnalysis from "../logged-in/home/DataAnalysis";
import { useAuth } from "../../context/authContext";
function Home(){
    const {token} = useAuth();
    return(
        <div>
            {token && <DataAnalysis />}
            {!token && <Introduction />}
        </div>
    )
}

export default Home;