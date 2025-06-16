import { Outlet } from "react-router-dom";
import Navigation from "../../components/logged-in/user/Navigation"

function User(){
    return(
        <div>
            <Navigation />
            <h1>User page</h1>
            <Outlet />
        </div>
    )
}

export default User;