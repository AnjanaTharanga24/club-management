import React from "react";


const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center">
        {/* Left section: Logo */}
        <a
          className="flex items-center text-2xl font-bold text-white hover:text-gray-400"
          style={{ marginLeft: "-100px" }}
          href="/"
        >
          <img src="/logo.png" alt="Logo" className="mr-2 w-15 h-12" />
          <span>Club-Master</span>
        </a>

        {/* Right section: Navigation and buttons */}
        <div className="ml-auto flex items-center space-x-8">
          <a
            className="text-gray-50 hover:text-gray-400 transition duration-300"
            href="/"
          >
            Home
          </a>
          <a
            className="text-gray-50 hover:text-gray-400 transition duration-300"
            href="/about"
          >
            About 
          </a>
          <a
            className="text-gray-50 hover:text-gray-400 transition duration-300"
            href="/contact"
          >
            Contact 
          </a>
          <div className="inline-block">
  <a
    className="bg-blue-500 text-gray-50 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded-full inline-block"
    href="/login"
  >
    Login
  </a>
</div>


         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

