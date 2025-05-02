import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        username,
        email,
        password,
      });
      setMessage("Registration successful!");
      // Automatically switch to login after successful registration
      setAction("Login");
    } catch (error) {
      setMessage("Registration failed: " + error.response?.data?.message || error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });
      localStorage.setItem("accessToken", response.data.accessToken);
      setMessage("Login successful!");
      navigate("/order"); // Redirect to the orders page after login
    } catch (error) {
      setMessage("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = () => {
    if (action === "Register") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="logo-container">
          <h1 className="logo">OrderFast</h1>
        </div>
        <div className="food-image-container">
          {/* Food items display here */}
        </div>
      </div>
      
      <div className="right-panel">
        <div className="auth-form">
          <h2>{action}</h2>
          
          {action === "Register" && (
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="password-toggle" 
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          
          {action === "Login" && (
            <div className="forgot-password-link">
              <span onClick={() => console.log("Forgot password clicked")}>
                Forgot Password?
              </span>
            </div>
          )}
          
          <button 
            className="submit-button" 
            onClick={handleSubmit}
          >
            {action === "Login" ? "Sign in" : "Register"}
          </button>
          
          {message && <div className="message">{message}</div>}
          
          <div className="auth-switch">
            {action === "Login" ? (
              <p>Don't have an account yet? <span onClick={() => setAction("Register")}>Register for free</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => setAction("Login")}>Sign in</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
