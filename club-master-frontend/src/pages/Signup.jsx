import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './Signup.css'; // Adjusted import path

const Signup = () => {
  return (
    <div>
      <Navbar />
      {/* Backgroundd Section */}
      <div className="backgroundd-section">
        {/* Logo */}
        <img
          src="./ll.png"
          alt="Logo"
          className="logoo"
        />
        <div className="rsignup-container">
          <div className="rsignup-form-wrapper">
            <h2 className="rsignup-heading">Create Your Account</h2>
            <form className="rsignup-form">
              <input type="text" className="rinput-box" placeholder="First Name" />
              <input type="text" className="rinput-box" placeholder="Last Name" />
              <input type="text" className="rinput-box" placeholder="Username" />
              <input type="email" className="rinput-box" placeholder="Email" />
              <input type="text" className="rinput-box" placeholder="Phone" />
              <input type="password" className="rinput-box" placeholder="Password" />
              <a href="/login" className="rsignup-button">
                 SIGN UP
              </a>
            </form>
          </div>
        </div>

        {/* Left Section for Text and Sign Up Button */}
        <div className="text-containerr">
          <h1>ONE OF US?</h1>
          <p>
            If you're already a member, sign in below to manage your club activities.
          </p> 

          {/* Sign in Button with href */}
          <a href="/login" className="signinn-button">
            SIGN IN
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Signup;
