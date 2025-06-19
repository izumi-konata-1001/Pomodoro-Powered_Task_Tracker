import { Link } from 'react-router-dom';

function Navigation(){

    return(
        <div className="flex justify-around items-center text-center text-brand-dark">
            <Link to='/login' className="w-1/2 hover:bg-brand-white">Login</Link>
            <Link to='/signup' className="w-1/2 hover:bg-brand-white">Signup</Link>
        </div>
    )
}

export default Navigation;