import React, { useState, useEffect } from "react";

const Rotractnav = ({ clubEventPage, clubNewsPage, clubLogoUrl, clubName }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-blue-600 shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a className="flex items-center" href="/">
          <div
            className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
              isScrolled
                ? "border-white bg-white"
                : "border-2 border-blue-500 p-1 bg-white shadow-lg"
            }`}
          >
            <img
              src={clubLogoUrl}
              alt="Rotract Club Logo"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <span
            className={`ml-3 font-bold text-xl transition-colors duration-300 hidden md:block ${
              isScrolled ? "text-white" : "text-blue-600"
            }`}
          >
            {clubName}
          </span>
        </a>

        <div className="flex items-center space-x-4 md:space-x-8">
          <div
            className="hidden md:flex items-center space-x-14"
            style={{ marginRight: "210px" }}
          >
            <a
              className={`transition duration-300 text-lg font-medium ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-800 hover:text-blue-600"
              }`}
              href="/"
            >
              Home
            </a>
            <a
              className={`transition duration-300 text-lg font-medium ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-800 hover:text-blue-600"
              }`}
              href="/rotractabout"
            >
              About
            </a>
            <a
              className={`transition duration-300 text-lg font-medium ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-800 hover:text-blue-600"
              }`}
              href="/rotractcontact"
            >
              Contact
            </a>
          </div>

          <div className=" hidden md:flex items-center space-x-4" style={{ marginRight: "-100px" }}>
            <a
              className={`transition duration-300 px-5 py-3 rounded-full text-lg font-medium flex items-center ${
                isScrolled
                  ? "bg-white text-blue-600 hover:bg-blue-100"
                  : "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg"
              }`}
              href={clubEventPage}
            >
              <span>Events</span>
            </a>
            <a
              className={`transition duration-300 px-5 py-3 rounded-full text-lg font-medium flex items-center ${
                isScrolled
                  ? "bg-white text-blue-600 hover:bg-blue-100"
                  : "bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg"
              }`}
              href={clubNewsPage}
            >
              <span>News</span>
            </a>

            <button
              className={`transition duration-300 px-5 py-3 rounded-full text-lg font-medium flex items-center ${
                isScrolled
                  ? "bg-white text-red-600 hover:bg-red-50"
                  : "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg"
              }`}
              onClick={() => {
                console.log("Unenroll clicked");
              }}
            >
              <span>Unenroll</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Rotractnav;
