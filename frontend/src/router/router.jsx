import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HomeRedirectRouter from "./HomeRedirectRouter";
import UserSetting from '../components/logged_in/user/Setting';
import ChangePassword from "../components/logged_in/user/ChangePassword";
import UserInformation from "../components/logged_in/user/Information";
const router =  createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {index: true, element:<HomeRedirectRouter />},
        ]
    },
    {
        path:'/login',
        element:<Login />,
    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        path:'/user',
        element:<UserSetting />,
        children:[
            {index:true, element:<UserInformation />},
            {path:'change_password', element:<ChangePassword />}
        ]
    }
]);

export default router;