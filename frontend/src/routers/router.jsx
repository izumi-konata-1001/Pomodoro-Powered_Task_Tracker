import {createBrowserRouter, Navigate} from 'react-router-dom'
import Home from '../pages/Home';
import Login from '../pages/Guest/Login'
import Signup from '../pages/guest/Signup'

import User from '../pages/logged-in/User'
import Setting from '../components/logged-in/user/Setting'
import ChangePassword from '../components/logged-in/user/ChangePassword'

import Pomodoro from '../pages/logged-in/Pomodoro'

import TasksAndDetail from '../pages/logged-in/TasksAndIssues';
import AllTasks from '../components/logged-in/tasks_and_issues/tasks/AllTasks'
import AllIssues from '../components/logged-in/tasks_and_issues/issues/AllIssues'
import TaskDetail from '../components/logged-in/tasks_and_issues/tasks/TaskDetail'
import IssueDetail from '../components/logged-in/tasks_and_issues/issues/IssueDetail'
import CreateTask from '../components/logged-in/tasks_and_issues/tasks/CreateTask'
import CreateIssue from '../components/logged-in/tasks_and_issues/issues/CreateIssue'
const router = createBrowserRouter([
    {
        path:'/',
        element:<Home />,

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
        path:'/tasks_and_issues',
        element:<TasksAndDetail />,
        children:[
            {index:true, element:<Navigate to='all_tasks' replace />},
            {path:'all_tasks', element:<AllTasks />},
            {path:'all_issues', element:<AllIssues />},
            {path:'task_detail/:task_id', element:<TaskDetail />},
            {path:'issue_detail/:issue_id', element:<IssueDetail />},
            {path:'create_task',element:<CreateTask />},
            {path:'create_issue', element:<CreateIssue />}
        ]
    },
    {
        path:'/pomodoro',
        element:<Pomodoro />
    },
])

export default router;