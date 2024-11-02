// Landing Page
import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="lg:ml-28 lg:mr-28 ml-6 mr-6 ">
      {/* Header */}
      <header className="flex justify-between items-center lg:px-8 py-4 border-b border-gray-200">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="replenx-main-logo.png"
            alt="Replenx Logo"
            className="h-10"
          />
        </div>

        {/* Login and Signup Buttons */}
        <div className="space-x-4">
          <Link to="/login">
            <button className="text-gray-500 hover:text-gray-700 font-medium transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link to="/reg">
            <button className="px-4 py-2 bg-primary text-white rounded font-medium hover:bg-blue-600 transition duration-300 ease-in-out">
              Signup
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 space-y-8 md:space-y-0">
        {/* Left Side - Text and Button */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="lg:text-7xl text-5xl  font-bold text-gray-800">
            Prescription Management <br></br> Made Easy.
          </h1>
          <p className="text-gray-600 text-2xl pt-4 pb-4">
            ReplenX streamlines medication management with a user-friendly web
            and mobile platform, automating refills and enhancing collaboration
            between patients and doctors. Effortlessly track medication and
            ensure timely replenishment with our secure, intuitive solution.
          </p>
          <Link to="/reg">
            <button className="px-6 py-4 bg-primary text-white font-semibold rounded hover:bg-blue-600 transition duration-300 ease-in-out">
              Try it for free
            </button>
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="home-image.png"
            alt="Health and wellness"
            className="w-[80%] h-auto"
          />
        </div>
      </div>
    </div>
  );
};
