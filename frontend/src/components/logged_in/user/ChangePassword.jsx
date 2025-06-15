import { useState } from 'react';

function ChangePassword(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        if(newPassword !== confirmPassword){
            setMessage('confirm password differ');
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/user/change_password`,{
                method:'POST',
                headers:
                {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            });

            const result = response.json();
            if(response.ok){
                setMessage('change password successfully');
            }
            else if(result.status === 404){
                console.error('old password is wrong, error:',result.error);
                setMessage('old password is wrong');
            }
            else if(result.status === 401){
                console.error('change password failed, error:', result.error);
                setMessage('change password failed');
            }
        }catch(error){
            console.error("change Password failed, error:", error);
        }
    }
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "newPassword"){
            setNewPassword(value);
        }
        else if(name =="oldPassword"){
            setOldPassword(value);
        }
        else if(name == "confirmPassword"){
            setConfirmPassword(value);
        }
    }


    return(
        <div>
            <h1>change password</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <label>old password:</label>
                <input name="oldPassword" value={oldPassword} onChange={handleChange} required />
                <br />

                <label>new password:</label>
                <input name="newPassword" value={newPassword} onChange={handleChange} required/>
                <br />

                <label>confirm password:</label>
                <input name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                <br/>

                <button type="submit">change password</button>
            </form>
        </div>
    )
}

export default ChangePassword;