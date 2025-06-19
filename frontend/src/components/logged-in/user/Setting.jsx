import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

function Setting() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      const result = await response.json();

      if (response.ok) {
        setUserId(result.id);
        setEmail(result.email);
        setUsername(result.username);
        setMessage("Current user loaded");
      } else if (response.status === 404) {
        setMessage("User not found");
      } else {
        console.error('Internal error:', result.error);
      }
    } catch (error) {
      console.error('Fetch user failed:', error);
      setMessage("Failed to load user info");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleChangePassword = () => {
    navigate('change_password');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold text-brand-dark">Account Settings</h2>
        <p className="text-sm text-gray-500">{message}</p>

        <div className="text-left space-y-2">
          <div>
            <label className="font-semibold">User ID: </label> {userId}
          </div>
          <div>
            <label className="font-semibold">Username: </label>{username}
          </div>
          <div>
            <label className="font-semibold">Email: </label>{email}
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <button
            onClick={handleChangePassword}
            type="button"
            className="bg-brand-primary text-brand-white py-2 px-4 rounded hover:bg-brand-dark transition"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            type="button"
            className="bg-red-500 text-brand-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;