import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div>
      <div className="baaackground">
        <Navbar />

        <div className="contact-container">
          <img src="/cll.png" alt="Club-Master Logo" className="contact-logo" />

          {/* Contact Details Section */}
          <div className="contact-header">
          <img src="/ll.png" alt="Club-Master Logo" className="ccontact-logo" />

            <h1>Get in Touch with Club-Master</h1>
            <p className="contact-paragraph">
              Have questions or need assistance? Our team is here to support you. <br />
              Whether you're looking to manage your club’s events, members, or finances, <br />
              or if you have any other inquiries, we are just a call or email away. <br />
              Reach out through the contact form or visit us at our location, <br />
              and we'll ensure your club's success with seamless management.
            </p>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>Email: <a href="mailto:support@clubmaster.com">support@clubmaster.com</a></span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Address: Faculty of Science, Dalugama, Kelaniya</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>Phone: <a href="tel:+94779056345">0779056345</a></span>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="contact-form">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input type="text" id="mobile" name="mobile" placeholder="Enter your mobile number" />
                </div>
                <div className="form-group">
                  <label htmlFor="faculty">Your Faculty</label>
                  <input type="text" id="faculty" name="faculty" placeholder="Enter your faculty" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="4" placeholder="Write your message"></textarea>
              </div>
              <button type="submit" className="send-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Contact;
