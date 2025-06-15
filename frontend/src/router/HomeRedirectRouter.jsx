import LoggedInHomepage from '../components/logged_in/Home';
import GuestHomepage from '../components/guest/Home';

function HomeRedirectRouter(){
    const token = localStorage.getItem("token");
    if(token){
        return <LoggedInHomepage />
    }
    else
        return <GuestHomepage />
}

export default HomeRedirectRouter;