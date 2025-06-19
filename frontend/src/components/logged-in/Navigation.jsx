import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/authContext';
function Navigation(){
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleLogout = () =>{
        logout();
        navigate('/');
    }
    return(
        <div className='flex justify-around items-center text-center text-brand-dark'>
            <Link to='/' className="w-1/5 hover:bg-brand-white">Home</Link>
            <Link to='/tasks_and_issues' className="w-1/5 hover:bg-brand-white">Tasks and Issues</Link>
            <Link to='/user' className="w-1/5 hover:bg-brand-white">UserInfo</Link>
            <Link to='/pomodoro' className="w-1/5 hover:bg-brand-white">Pomodoro</Link>
            <label onClick={handleLogout} className="w-1/5 hover:bg-brand-white">logout</label>
        </div>
    )
}

export default Navigation;