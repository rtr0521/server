import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
    const [message, setMessage] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields (ensure username and password are provided)
        if (!username || !password) {
            setMessage('Please enter both username and password.');
            return;
        }

        try {
            // Send the authentication request to the backend
            const response = await axios.post('http://localhost:5000/admin/auth', {
                username,
                password,
            });
            
            // Check the response status and handle successful authentication
            if (response.status === 200) {
                alert('Login successful!');
                // Redirect the user to the admin dashboard
                navigate('/admin/dashboard');
            } else {
                // Handle unsuccessful authentication
                setMessage('Authentication failed. Please check your credentials.');
            }
        } catch (error) {
            // Handle any network or server errors
            console.error('Error during authentication:', error);
            setMessage('An error occurred during authentication. Please try again later.');
        }
    };

    // Toggle visibility for password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800">
            <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-white text-center">Admin Login</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 mt-1 text-sm bg-gray-700 text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
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

                    {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
                    
                    <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-600">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthAdmin;
