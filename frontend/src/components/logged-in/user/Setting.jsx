import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Setting(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleChangePassword = () =>{
        navigate('change_password');
        return;
    }

    const handleLogout = ()=>{

    }

    return(
        <div>
            <h1>Setting</h1>

            <label>username: </label>
            <label>{username}</label>
            <br />

            <label>email: </label>
            <label>{email}</label>
            <br />
            <button onClick={handleChangePassword} type="button">change password</button>
            <button onClick={handleLogout} type="button">logout</button>
        </div>
    )
}