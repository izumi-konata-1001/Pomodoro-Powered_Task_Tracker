import {useState} from 'react';


function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3000/api/user/login_user',
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email: email,
                        password: password,
                    })
                }
            )
            const result = await response.json();
            if(response.ok)
            {
                setMessage(result.message);
                console.log("successfully login, token: ", result.token);
            }
            else
            {
                setMessage(result.error || "login failed");
                console.warn("login failed", result.error);
            }
        }catch(error){
            console.error('error: ' ,error);
            setMessage('login failed');
        }
    };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "email")
            setEmail(value);
        
        if(name == "password")
            setPassword(value);
    };

    return(
        <div>
            <h1>Login</h1>
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