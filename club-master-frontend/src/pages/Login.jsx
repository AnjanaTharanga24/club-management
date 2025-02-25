import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './Login.css'; // Adjusted import path

const Login = () => {
  
  return (
    <div>
      <Navbar />
      {/* Background Section */}
      <div className="background-section">
        {/* Logo */}
        <img
          src="./ll.png"
          alt="Logo"
          className="logo"
        />

        {/* Sign In Section */}
        <div className="signin-section">
          <h2 className="signin-heading"></h2>

          {/* Username Field */}
          <div className="input-container username">
            <label htmlFor="username" className="input-label">USERNAME</label>
            <input 
              type="text" 
              id="username"
              placeholder="Enter your username" 
              className="input-box"
            />
          </div>

          {/* Password Field */}
          <div className="input-container password">
            <label htmlFor="password" className="input-label">PASSWORD</label>
            <input 
              type="password" 
              id="password"
              placeholder="Enter your password" 
              className="input-box"
            />
          </div>

          {/* Forgot Password */}
          <p className="forgot-password">Forgot Password?</p>

          {/* Sign In Button */}
          <a href="/clubhome">
           <button className="signin-button">SIGN IN</button>
         </a>
        </div>

        {/* Left Section for Text and Sign Up Button */}
        <div className="text-container">
          <h1>New Here?</h1>
          <p>
            Sign up now to explore, manage, and stay updated with your favourite university clubs!
          </p> 

          {/* Sign Up Button with href */}
          <a href="/signup" className="signup-button">
          
            SIGN UP
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Login;
