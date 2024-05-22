import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams(); // The reset token from the URL
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const navigate = useNavigate(); // Hook to navigate

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { newPassword: password });
            setMessage(response.data.message);

            // Redirect to login page upon successful password reset
            navigate('/login');
        } catch (error) {
            console.error('Error resetting password:', error);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    // Function to toggle the show/hide password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800"> {/* Changed background color */}
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-white text-center">Reset Password</h3>
                <p className="mb-4 text-gray-400 text-center">Enter your new password</p>
                <div className="mb-3">
                    <label htmlFor="password" className="block text-sm font-medium text-white">New Password*</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"} // Change input type based on showPassword state
                            placeholder="Enter a new password"
                            className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:border-purple-blue-500"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-white"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-600">Reset Password</button>
                <p className="mt-4 text-sm text-center text-white">{message}</p>

                
            </form>
        </div>
    );
}

export default ResetPassword;
