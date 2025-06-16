import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function Setting(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    console.log('token:', token);
    const fetchUser = async () => {
        try{
            const response = await fetch(`${BASE_URL}/user/me`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                }
            });

            const result = await response.json();

            if(response.ok){
                setUserId(result.id);
                setEmail(result.email);
                setUsername(result.username);
                setMessage("current user loaded");
                return;
            }
            else if(response.status == 404){
                setMessage("user not found");
                return;
            }
            else{
                console.error('Internal error, error:', result.error);
            }
        }catch(error){
            console.error('find user information failed, error: ', error);
            setMessage("find user failed");
            return;
        }
    }
    useEffect(() => {
        if(token){
            fetchUser();
            return;
        }
    }, [token])


    const handleChangePassword = () =>{
        navigate('change_password');
        return;
    }

    const handleLogout = ()=>{
        logout();
        navigate('/');
    }

    return(
        <div>
            <h1>Setting</h1>
            <h3>{message}</h3>

            <label>user id:</label>
            <label>{userId}</label>
            <br />

            <label>username: </label>
            <label>{username}</label>
            <br />

            <label>email: </label>
            <label>{email}</label>
            <br />
            <button onClick={handleChangePassword} type="button">change password</button>
            <br />
            <button onClick={handleLogout} type="button">logout</button>
        </div>
    )
}

export default Setting;