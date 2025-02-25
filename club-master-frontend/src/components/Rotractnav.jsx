import React from "react";

const Rotractnav = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left section: Logo */}
        <a
          className="flex items-center"
          href="/"
        >
          <img
            src="/rotractuok.png"
            alt="Logo"
            className="w-25 h-20" // Adjust the size to make the logo appear more prominent
          />
        </a>

        {/* Right section: Navigation and buttons */}
        <div className="flex items-center space-x-8">
          <a
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
            href="/"
          >
            Home
          </a>
          <a
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
            href="/rotractabout"
          >
            About
          </a>
          <a
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
            href="/rotractcontact"
          >
            Contact
          </a>
          <a
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-5 py-3 rounded-full text-lg"
            href="/rotractevent"
          >
            Events
          </a>
          <a
            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-5 py-3 rounded-full text-lg"
            href="/rotractnews"
          >
            News
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Rotractnav;
