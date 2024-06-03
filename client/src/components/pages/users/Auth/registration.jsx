import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import illustration from "../../../../assets/images/illustration.png";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [message, setMessage] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegistrationError(true);
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setRegistrationError(false);
      }, 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePicture", profilePicture);

      const response = await axios.post(
        "http://localhost:5000/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setRegistrationSuccess(true);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        setRegistrationSuccess(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setRegistrationError(true);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setRegistrationError(false);
      }, 3000);
    }
  };
  return (
    <div className="flex-col flex items-center justify-center w-full h-screen lg:flex lg:items-center lg:justify-between lg:w-full lg:flex-row lg:h-screen text-white">
      <img className="hidden lg:flex lg:w-96 lg:m-auto  lg:h-auto" src={illustration} alt="" />
      <form
        onSubmit={handleSubmit}
        className="w-full lg:border-l lg:border-white p-8 h-full lg:max-w-2xl"
      >
        <h3 className="mb-3 text-2xl font-extrabold text-center">Register</h3>
        <p className="mb-4 text-sm text-center">Create your account</p>
        <div className="mb-3">
          <label htmlFor="fullname" className="block text-sm font-medium ">
            Full Name*
          </label>
          <input
            id="fullname"
            type="text"
            placeholder="John Doe"
            className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
            value={fullname}
            onChange={handleFullnameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="block text-sm font-medium ">
            Username*
          </label>
          <input
            id="username"
            type="text"
            placeholder="Choose a username"
            className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium ">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium ">
            Password*
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password"
              className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center px-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium "
          >
            Confirm Password*
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center px-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium "
          >
            Profile Picture*
          </label>
          <input
            id="profilePicture"
            type="file"
            className="w-full px-3 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-sm font-bold leading-none text-white bg-primary rounded-md"
        >
          Register
        </button>
        {registrationSuccess && (
          <div
            role="alert"
            className="alert alert-success mt-4 p-3 rounded-md bg-green-600 text-white"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Registration successful! Redirecting to login...</span>
            </div>
          </div>
        )}
        {registrationError && (
          <div
            role="alert"
            className="alert alert-error mt-4 p-3 rounded-md bg-red-600 text-white"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;
