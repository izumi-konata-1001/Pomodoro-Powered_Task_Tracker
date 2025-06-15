import { Link } from 'react-router-dom';

function Navigation(){

    return(
        <div>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/signup'>Signup</Link>
        </div>
    )
}

export default Navigation;