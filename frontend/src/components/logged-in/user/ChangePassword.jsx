import { useState } from 'react';
import { useAuth } from '../../../context/authContext';

function ChangePassword(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();

    const [message, setMessage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;

        if(name == "oldPassword"){
            setOldPassword(value);
            return;
        }
        else if(name =="newPassword"){
            setNewPassword(value);
            return;
        }
        else if(name == "confirmPassword"){
            setConfirmPassword(value);
            return;
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(newPassword != confirmPassword){
            setMessage('password differ');
            return;
        }

        try{
            const response = await fetch(`${BASE_URL}/user/change_password`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            });
            
            const result = await response.json();
            if(response.ok){
                console.log('change password successfully, message:', result.message);
                setMessage('change password successfully');
                return;
            }
            else if(response.status == 404){
                console.error('change password failed:, error:', result.error);
                setMessage('old password is wrong');
                return;
            }
            else if(response.status == 401){
                console.error('change password failed:, error:', result.error);
                setMessage('change password failed, please check the server');
                return;
            }
            else if(response.status == 500){
                console.error('Internal server error,error:' , result.error);
                setMessage('Internal server error');
            }
        }catch(error){
            console.error('change password failed, error: ', error);
            setMessage('change password failed, please check the server');
            return;
        }
    }

    return(
        <div>
            <h1>Change password</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <label>old password: </label>
                <input name="oldPassword" value={oldPassword} onChange={handleChange}  required />
                <br />

                <label>new password: </label>
                <input name="newPassword" value={newPassword} onChange={handleChange} required />
                <br />

                <label>confirm password: </label>
                <input name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <br />

                <button type="submit">change</button>
            </form>
        </div>
    )
}

export default ChangePassword;