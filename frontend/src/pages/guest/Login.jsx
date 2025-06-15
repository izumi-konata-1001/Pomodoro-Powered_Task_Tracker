import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

function Login(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const {login} = useAuth();
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleChange = (e) => {
        const {name,value} = e.target;
        if(name == "email"){
            setEmail(value);
            return;
        }
        else if(name == "password"){
            setPassword(value);
            return;
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/user/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    email:email,
                    password:password,
                }),
            });
            const result = await response.json();

            if(response.ok && result.token){
                login(result.token);
                console.log("login successfully");
                setMessage("successfully login");
                navigate('/');
                return;
            }
            else if(response.status == 404){
                console.error("login failed, error:", result.error);
                setMessage('use not found');
                return;
            }
            else if(response.status == 400){
                console.error('login failed, error:', result.error);
                setMessage('wrong password');
                return;
            }
            else if(response.status == 500){
                console.error('login failed, error:', result.error);
                setMessage('server error');
                return;
            }
        }catch(error){
            console.error("login failed: ",error);
        }
    }

    return(
        <div>
            <Link to="/">Home</Link>
            <br />
            <Link to="/signup">Signup</Link>
            <h1>Login</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <label>email: </label>
                <input name="email" value={email} onChange={handleChange} required />
                <br />

                <label>password: </label>
                <input name="password" value={password} onChange={handleChange} required />
                <br />

                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;