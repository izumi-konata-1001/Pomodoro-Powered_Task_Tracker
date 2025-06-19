import { useAuth } from '../../context/authContext'
import { useState } from 'react';
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import Navigation from './Navigation';
function Header(){
    const {token} = useAuth();
    const [openNav,setOpenNav] = useState(false);
    const handleOpenNav = () => {
        setOpenNav((prev) =>{
            return !prev;
        })
    }
    return(
        <div>
            <div className="bg-brand-primary flex justify-center font-sans h-8 items-center">
                <span className="text-brand-white">Task Tracker</span>
            </div>

            <div onClick={handleOpenNav} className="bg-brand-secondary flex justify-center text-brand-dark pt-2 pb-2 hover:bg-brand-white">
                { !openNav ? <GoChevronDown /> : <GoChevronUp />}
            </div>

            <div className="bg-brand-secondary">
                {openNav ? <Navigation /> :null}
            </div>

        </div>
    )
}

export default Header;