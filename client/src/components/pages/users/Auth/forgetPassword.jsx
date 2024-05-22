import React, { useState } from 'react';
import axios from 'axios';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forget-password', { email });
            setMessage(response.data.message);

            // If the request is successful, set passwordResetSuccess to true
            setPasswordResetSuccess(true);

            // Clear the success message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setPasswordResetSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error requesting password reset:', error);

            // Set passwordResetError to true and set error message
            setPasswordResetError(true);
            setErrorMessage(error.response?.data?.message || 'An error occurred');

            // Clear the error message after 3 seconds (3000 milliseconds)
            setTimeout(() => {
                setPasswordResetError(false);
            }, 3000);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gray-800">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white text-black rounded-lg shadow-lg p-8">
                <h3 className="mb-3 text-4xl font-extrabold text-center">Forgot Password?</h3>
                <p className="mb-4 text-center">Enter your email to receive password reset link</p>
                
                <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-medium">Email*</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="youremailaddress@gmail.com"
                        className="w-full px-4 py-3 mt-1 text-sm bg-white border border-black rounded-md placeholder-black"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    
                </div>
                
                <button type="submit" className="w-full py-3 text-sm font-bold leading-none text-white bg-black rounded-md">Send Reset Link</button>

                {/* Success alert */}
                {passwordResetSuccess && (
                    <div role="alert" className="alert alert-success mt-4 p-3 rounded-md bg-green-600 text-white">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Password reset link sent successfully!</span>
                        </div>
                    </div>
                )}

                {/* Error alert */}
                {passwordResetError && (
                    <div role="alert" className="alert alert-error mt-4 p-3 rounded-md bg-red-600 text-white">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Error! {errorMessage}</span>
                        </div>
                    </div>
                )}

            </form>
        </div>
    );
}

export default ForgetPassword;
