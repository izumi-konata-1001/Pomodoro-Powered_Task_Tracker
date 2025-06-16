import {createBrowserRouter, Navigate} from 'react-router-dom'
import App from '../App'
import Login from '../pages/Guest/Login'
import Signup from '../pages/guest/Signup'

import User from '../pages/logged-in/User'
import Setting from '../components/logged-in/user/Setting'
import ChangePassword from '../components/logged-in/user/ChangePassword'

import Pomodoro from '../pages/logged-in/Pomodoro'

import Tasks from '../pages/logged-in/Tasks'
import AllTasks from '../components/logged-in/tastk/AllTasks'
import AllGroups from '../components/logged-in/tastk/AllGroups'
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
            {path:'change_password', element:<ChangePassword />}
        ]
    },
    {
        path:'/tasks',
        element:<Tasks />,
        children:[
            {index:true, element:<Navigate to='all_tasks' replace />},
            {path:'all_tasks', element:<AllTasks />},
            {path:'all_groups', element:<AllGroups />},
        ]
    },
    {
        path:'/pomodoro',
        element:<Pomodoro />
    },
])

export default router;