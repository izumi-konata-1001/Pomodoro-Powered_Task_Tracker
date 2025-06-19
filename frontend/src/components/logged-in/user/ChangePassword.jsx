import { useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
    const navigate= useNavigate();
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const handleBack = () => {
        navigate(-1);
    };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/change_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Password changed successfully');
      } else if (response.status === 404) {
        setMessage('Old password is incorrect');
      } else if (response.status === 401 || response.status === 500) {
        setMessage(result.error || 'Server error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center space-y-4">
       <div className="text-left">
        <button
            onClick={handleBack}
            className="bg-brand-secondary text-brand-dark px-4 py-2 rounded hover:bg-brand-primary hover:text-white transition"
            >
            Back
            </button>
        </div>
        <h2 className="text-2xl font-semibold text-brand-dark">Change Password</h2>
        <h3 className="text-red-600">{message}</h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="block mb-1 font-medium">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              value={oldPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm New Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-brand-primary text-white py-2 px-4 rounded hover:bg-brand-dark transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;