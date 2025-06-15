import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Guest/Login'
import Signup from '../pages/guest/Signup'

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
    }
])

export default router;