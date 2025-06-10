import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Components/MainBody/Home";
import Error from "./Pages/Error";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Components/MainBody/About";
const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {index: true, element:<Home />},
            {path:"about", element:<About />}
        ]
    },
    {
        path:"/login",
        element:<Login />,
    },
    {
        path:"/signup",
        element:<SignUp />,
    },
    {
        path:"*",
        element:<Error />,
    }
]);
export default router;