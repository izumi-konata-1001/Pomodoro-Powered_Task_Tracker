import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../../context/authContext';
function Navigation(){
    const navigate = useNavigate();
    const {logout} = useAuth();
    const handleLogout = () =>{
        logout();
        navigate('/');
    }
    return(
        <div>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/tasks'>Tasks</Link>
            <br />
            <Link to='/user'>UserInfo</Link>
            <br />
            <Link to='/pomodoro'>Pomodoro</Link>
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Navigation;