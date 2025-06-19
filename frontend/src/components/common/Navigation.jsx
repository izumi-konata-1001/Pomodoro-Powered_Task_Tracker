import { useAuth } from "../../context/authContext"
import LoggedInNavigation from "../logged-in/Navigation";
import GusetNavigation from '../guest/Navigation'
function Navigation(){
    const {token} = useAuth();
    return(
        <div>
            { token ? <LoggedInNavigation /> : <GusetNavigation />}
        </div>
    )
}

export default Navigation