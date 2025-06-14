import { Link } from 'react-router-dom'
import { useState} from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup(){
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validEmail, setValidEmail] = useState("");
    const [validPassword,setValidPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e)=>{
        const {name,value} = e.target;
        if(name == "email")
            setEmail(value);
        else if(name == "username")
            setUsername(value);
        else if(name == "password")
            setPassword(value);
        else if(name == "confirmPassword")
            setConfirmPassword(value);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setValidEmail("");
        setValidPassword("");
        if(password != confirmPassword){
            setValidPassword("confirm password differ");
            return;
        }
        if(!isValidEmail(email)){
            setValidEmail("inValid email");
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/user/create`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(
                        {
                            email:email,
                            username:username,
                            password:password,
                        }
                    )
                }
            );
            const result = await response.json();
            if(response.ok){
                setMessage("successfully login");
            }
            else if(response.status === 409){
                setMessage("email or username already exist");
            }
            else {
                setMessage(`Unknown error: ${result.error || 'No details'}`);
            }
        }catch(error){
            console.error("request error: ", error);
            setMessage("Network error or server is not responding");
        }

    }

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    return(
        <div>
            <nav>
                <Link to="/">Home</Link>
                <br />
                <Link to="/login">Login</Link>
            </nav>
            <h1>signup</h1>
            <br />
            <h3>{message}</h3>
            <form onSubmit={handleSubmit}>
                <label>email:</label>
                <input name="email" value={email} onChange={handleChange} required/>
                <label>{validEmail}</label>
                <br />

                <label>username:</label>
                <input name="username" value={username} onChange={handleChange} required/>
                <br />

                <label>password:</label>
                <input name="password" value={password} onChange={handleChange} required/>
                <br />

                <label>confirm password:</label>
                <input name="confirmPassword" value={confirmPassword} onChange={handleChange} required/>
                <label>{validPassword}</label>
                <br />

                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default Signup;