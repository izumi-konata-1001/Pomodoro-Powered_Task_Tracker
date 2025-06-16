import { useState } from 'react';

function ChangePassword(){
    const [message, setMessage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmaPassword, setConfirmPassword] = useState("");

    const handleChange = (e) =>{

    }

    const handleSubmit = async (e) =>{

    }

    return(
        <div>
            <h1>Change password</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <lable>old password: </lable>
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