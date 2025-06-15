import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
function Signup(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const token = useAuth();
    const [message, setMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [username, setUsername] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;

        if(name == "email"){
            setEmail(value);
            return;
        }
        else if(name =="username"){
            setUsername(value);
            return;
        }
        else if(name == "password"){
            setPassword(value);
            return;
        }
        else if(name == "confirmPassword"){
            setConfirmPassword(value);
            return;
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(confirmPassword !== password){
            setConfirmPassword('password differ');
            return;
        }

        const isEmailValid = isValidEmail(email);
        if(!isEmailValid)
        {
            setEmailMessage('email is not valid')
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/user/create`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email: email,
                    username:username,
                    password: password,
                })
            });
            const result = await response.json();
            if(response.ok){
                setMessage("register successfully");
                return;
            }
            else if(response.status == 409){
                console.error('create user failed:', result.error);
                setMessage("username already exist or email already used.");
                return;
            }
            else if(response.status == 500){
                console.error('create user failed:', result.error);
                setMessage("Sign up failed, server error");
            }
        }catch(error){
            console.error('Internal server error, error:', error);
        }

    }

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    return(
        <div>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/login'>Login</Link>
            <br />
            <h1>Create a new account</h1>
            <h3>{message}</h3>
            <form onSubmit={handleSubmit}>
                <label>email:</label>
                <input name="email" value={email} onChange={handleChange} required />
                <label>{emailMessage}</label>
                <br />

                <label>username: </label>
                <input name="username" value={username} onChange={handleChange} required/>
                <br />

                <label>password: </label>
                <input name="password" value={password} onChange={handleChange} required />
                <br />

                <label>confirm password: </label>
                <input name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <label>{passwordMessage}</label>
                <br />

                <button type="submit">register</button>
            </form>
        </div>
    )
}


export default Signup;