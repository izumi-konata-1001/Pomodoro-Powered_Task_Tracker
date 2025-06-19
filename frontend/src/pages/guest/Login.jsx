import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

import Header from '../../components/common/Header';

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
                setMessage('user not found');
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
        <div className="bg-brand-dark min-h-screen">
            <Header />
            <div className="w-4/5 min-h-screen mx-auto bg-brand-light bg-opacity-90 flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold text-brand-dark">Login</h1>
            <h3 className="text-2xl text-brand-dark">{message}</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/4 max-w-md">
                <div>
                <label className="block mb-1">Email:</label>
                <input
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                </div>

                <div>
                <label className="block mb-1">Password:</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                </div>

                <button
                type="submit"
                className="bg-brand-primary text-brand-white py-2 px-4 rounded hover:bg-brand-dark transition"
                >
                Login
                </button>
            </form>
            </div>
        </div>
    )
}

export default Login;