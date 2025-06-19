import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';

function Signup(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "email") {
        setEmail(value);
        } else if (name === "username") {
        setUsername(value);
        } else if (name === "password") {
        setPassword(value);
        } else if (name === "confirmPassword") {
        setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmPassword !== password) {
        setPasswordMessage("Passwords do not match");
        return;
        } else {
        setPasswordMessage("");
    }

    const isEmailValid = isValidEmail(email);
        if (!isEmailValid) {
        setEmailMessage("Invalid email format");
        return;
        } else {
        setEmailMessage("");
    }

    try {
      const response = await fetch(`${BASE_URL}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

    const result = await response.json();

    if (response.ok) {
        setMessage("Successfully registered");
        navigate('/login');
    } else if (response.status === 409) {
        setMessage("Username or email already exists");
    } else if (response.status === 500) {
        setMessage("Server error");
    }
    } catch (error) {
      console.error("Error:", error);
    }
  };

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    return (
    <div className="bg-brand-dark min-h-screen">
        <Header />
        <div className="w-4/5 min-h-screen mx-auto bg-brand-light bg-opacity-90 flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl font-bold text-brand-dark">Create a New Account</h1>
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
                    {emailMessage && <p className="text-red-600 text-sm">{emailMessage}</p>}
                </div>

                <div>
                    <label className="block mb-1">Username:</label>
                    <input
                    name="username"
                    value={username}
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

                <div>
                    <label className="block mb-1">Confirm Password:</label>
                    <input
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                    {passwordMessage && <p className="text-red-600 text-sm">{passwordMessage}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-brand-primary text-brand-white py-2 px-4 rounded hover:bg-brand-dark transition"
                >
                    Register
                </button>
            </form>
        </div>
    </div>
  );
}

export default Signup;