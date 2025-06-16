import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Guest/Login'
import Signup from '../pages/guest/Signup'

import User from '../pages/logged-in/User'
import Setting from '../components/logged-in/user/Setting'
import ChangePassword from '../components/logged-in/user/ChangePassword'
const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,

    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/signup',
        element:<Signup />
    },
    {
        path:'/user',
        element:<User />,
        children:[
            {index:true, element:<Setting />},
            {path:'', element:<ChangePassword />}
        ]
    }
])

export default router;