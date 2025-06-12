import { createBrowserRouter } from 'react-router-dom';

import App from './pages/App.jsx';
import Signup from './pages/Signup.jsx';
import Home from './components/Home.jsx';
import Login from './pages/Login.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {path:'', element:<Home />}
    ]
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/login',
    element:<Login />
  }
]);

export default router;