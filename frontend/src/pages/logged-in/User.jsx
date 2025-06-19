import { Outlet } from "react-router-dom";
import Navigation from "../../components/logged-in/user/Navigation"
import Header from "../../components/common/Header";
function User(){
    return(
        <div>
            <Header />
            <h1 className="text-center text-lg">Account Infomation</h1>
            <Outlet />
        </div>
    )
}

export default User;