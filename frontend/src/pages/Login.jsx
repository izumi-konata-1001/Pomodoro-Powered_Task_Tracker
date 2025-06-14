import { Link } from 'react-router-dom'
import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "email"){
            setEmail(value);
            return;
        }
        if(name =="password"){
            setPassword(value);
            return;
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${BASE_URL}/user/login`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        email:email,
                        password:password,
                    })
                }
            )

            const result = await response.json();
            if(response.ok){
                console.log("Login successfully, token:" , result.token);
                setMessage("Login successfully");
                return;
            }
            else if(response.status == 400){
                console.error("wrong password",result.error);
                setMessage("Wrong password");
                return;
            }
            else if(response.status == 404){
                console.error("user not found", result.error);
                setMessage("This email is not registered");
                return;
            }
            else{
                console.error("Internal server error", result.error);
                setMessage("Login failed");
                return;
            }
        }catch(error){
            console.error("request error: ", error);
            setMessage("Login failed");
        }
    }
    return(
        <div>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            
            <h1>login</h1>
            <h3>{message}</h3>
            <form onSubmit={handleSubmit}>
                <label>email: </label>
                <input name="email" value={email} onChange={handleChange} required/>
                <br />

                <label>password: </label>
                <input name="password" value={password} onChange={handleChange} required/>
                <br />

                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;