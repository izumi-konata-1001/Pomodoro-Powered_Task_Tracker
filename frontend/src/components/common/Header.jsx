import { useAuth } from '../../context/authContext'
import GuestNavigation from '../guest/Navigation'
import LoggedInNavigation from '../logged-in/Navigation'
function Header(){
    const {token} = useAuth();
    return(
        <div>
            { !token && <GuestNavigation />}
            { token && <LoggedInNavigation />}
        </div>
    )
}

export default Header;