import { Outlet } from "react-router-dom";
import Navigation from "../../components/logged-in/user/Navigation"
import Header from "../../components/common/Header";
function User(){
    return(
        <div  className="bg-brand-dark min-h-screen">
            <Header />
             <div className="w-4/5 bg-brand-light bg-opacity-90 mx-auto min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export default User;