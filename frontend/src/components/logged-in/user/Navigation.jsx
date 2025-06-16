import { useNavigate, useLocation } from 'react-router-dom'

function Navigation(){
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleBack = () => navigate(-1);
    const handleHome = () => navigate('/');

    return(
        <div>
            {path.includes('/user/change_password') ? (
                <button onClick={handleBack}>Back</button>
            ) : path.includes('/user') ? (
                <button onClick={handleHome}>Home</button>
            ) : null}
        </div>
    )
}

export default Navigation;