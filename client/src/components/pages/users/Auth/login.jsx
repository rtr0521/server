import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import illustration from "../../../../assets/images/illustration.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false); // State for tracking login error
  const [errorMessage, setErrorMessage] = useState(""); // State for storing error message
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginError(true);
      setErrorMessage("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post("https://server-3uk1.onrender.com/login", {
        username,
        password,
      });

      // Set loginSuccess to true on successful login
      setLoginSuccess(true);

      // Redirect to the desired page after a brief delay
      setTimeout(() => {
        navigate("/userDashboard");
      }, 2000);
    } catch (error) {
      // Set loginError to true and update the error message
      setLoginError(true);
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex align-center justify-center ">
      <div className="flex-col flex items-center justify-center w-96 lg:flex lg:items-center lg:justify-between lg:w-full lg:flex-row lg:h-screen lg:bg-dark-gray-800">
        <img className="w-60 lg:m-auto lg:w-96 lg:h-auto " src={illustration} alt="" />
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl lg:border-l p-8 h-screen text-white"
        >
          <h3 className="mb-3 text-4xl font-extrabold text-center">Sign In</h3>
          <p className="mb-4  text-center">
            Ready to dive back in? Sign in to explore your personalized
            dashboard and discover what's new.
          </p>
          <div className="mb-3">
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 mt-1 text-sm bg-transparent border border-white  rounded-lg focus:outline-none focus:border-purple-blue-500"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 mt-1 text-sm bg-transparent border border-white text-white rounded-lg focus:outline-none focus:border-purple-blue-500"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="mr-2 leading-tight"
              />
              <span className="text-sm font-normal">Remember me</span>
            </label>
            <Link to="/forget-password" className="text-sm font-medium ">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-bold leading-none text-white bg-primary rounded-md"
          >
            Sign in
          </button>

          {loginSuccess && (
            <div role="alert" className="alert alert-success mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Login successful!</span>
            </div>
          )}

          {loginError && (
            <div role="alert" className="alert alert-error mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! {errorMessage}</span>
            </div>
          )}

          <p className="mt-4 text-sm ">
            Not registered yet?{" "}
            <Link
              to="/registration"
              className="font-bold text-purple-blue-500 hover:text-purple-blue-600"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
