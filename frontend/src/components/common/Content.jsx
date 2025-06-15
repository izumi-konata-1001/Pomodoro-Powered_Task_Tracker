import Introduction from "../guest/Introduction";
import AllTasks from "../logged-in/tastk/AllTasks";
import { useAuth } from "../../context/authContext";
function Home(){
    const {token} = useAuth();
    return(
        <div>
            {token && <AllTasks />}
            {!token && <Introduction />}
        </div>
    )
}

export default Home;