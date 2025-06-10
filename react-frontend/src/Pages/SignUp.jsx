import {useState} from "react";

function SignUp(){
    const [userData, setUserData] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const handleChange = (e) => {
        const{name, value} = e.target;
        setUserData((prev) => {
            console.log("prev: ", prev);
            const newState = {...prev, [name]:value};
            console.log("newSate: " , newState);
            return newState;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = userData.username;
        const email = userData.email;
        const password = userData.password;
        const confirmPassword = userData.confirmPassword;

        if(!username || !email || !password || !confirmPassword)
        {
            alert("Please fill in all fields.");
            return;
        }
        if(password != confirmPassword)
        {
            alert("Passwords do not match.");
            return;
        }
        else
        {
            console.log("Registered user:", { username, email, password });
            alert("Sign up successful!");
        }
    }


    return(
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label>UserName:</label>
                <input type="text" name="username" value={userData.username} onChange={handleChange} required />
                <br /><br />

                <label>E-mail:</label>
                <input type="text" name="email" value={userData.email} onChange={handleChange} required />
                <br /><br />

                <label>Password:</label>
                <input type="text" name="password" value={userData.password} onChange={handleChange} required />
                <br/><br />

                <label>Comfirm Password:</label>
                <input type="text" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
                <br /><br /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default SignUp;