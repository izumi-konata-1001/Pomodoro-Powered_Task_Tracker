import {useState} from 'react';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setMessage('wrong email');
            return;
        }
        if(password !== confirmPassword)
        {
            setMessage('confirm password is differ');
            return;
        }
        try{
            const response = await fetch('http://localhost:3000/api/user/create_user',
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                    {
                        username,
                        email,
                        password,
                    }),
                }
            )
            const result = await response.json();
            
            if (response.ok) {
            setMessage('successfully sign up');
            console.log('response', result);
            } else {
            setMessage(`register failed:${result.error || 'unknown error'}`);
            }
        }catch(error){
            console.error('error: ' ,error);
            setMessage('register failed');
        }
        console.log('successfully submit');
        setMessage('submited');
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == 'username')
            setUsername(value);
        else if (name === 'email') setEmail(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'confirmPassword') setConfirmPassword(value);
    }
  return(
    <div>
        <h1>sign up</h1>
        <h3>{message}</h3>
        <form onSubmit = {handleSubmit}>
            <label>username: </label>
            <input name="username" value={username} onChange={handleChange} required/>
            <br/>

            <label>email:</label>
            <input name="email" value={email} onChange={handleChange} required/>
            <br/>

            <label>password:</label>
            <input name="password" value={password} onChange={handleChange} required/>
            <br/>

            <label>comfirm password:</label>
            <input name="confirmPassword" value={confirmPassword} onChange={handleChange} required/>
            <br/>

            <button type="submit">submit</button>
        </form>
    </div>
  );
}


export default Signup;