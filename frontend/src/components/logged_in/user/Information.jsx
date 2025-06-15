import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Information(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserInfo() {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        console.error("Not logged in");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setUserId(result.id);
          setEmail(result.email);
          setUsername(result.username);
          console.log("User info loaded successfully");
        } else if (response.status === 404) {
          console.error("User not found", result.error);
        } else {
          console.error("Load user info failed", result.error);
        }
      } catch (error) {
        console.error("Load user info failed", error);
      }
    }
    fetchUserInfo();
  }, []);

    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/login");
        const token = localStorage.getItem("token");
        console.log(token);
    }

    function handleChangePassword(){
        navigate("change_password");
    }
    return(
        <div>
            <label>email: </label>
            <label>{email}</label>
            <br />

            <label>username: </label>
            <label>{username}</label>
            <br />

            <button onClick={handleChangePassword}>change password</button>
            <br />
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Information;