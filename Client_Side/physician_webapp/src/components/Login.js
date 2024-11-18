import React from "react";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [Resp, setResp] = useState("waiting");
  const [LoginForm, setLoginForm] = useState({
    Username: "",
    Password: "",
  });

  const handle = (e) => {
    setLoginForm({ ...LoginForm, [e.target.name]: e.target.value });
  };

  async function submittion(e) {
    e.preventDefault();
    axios.post("http://141.215.202.56:8000/Login", { LoginForm }).then((resp) => {
      setResp(resp.data);
    });
  }

  return (
    <div className="min-h-screen flex lg:flex-row  md:flex-row flex-col ">
      {/* Left Section for logo and image */}
      <div className="lg:md:w-1/2 w-[100%] bg-secondary flex flex-col justify-center items-center">
        <header className="w-full py-4 px-8">
          <img src="replenx-main-logo.png" alt="Logo" className="w-48" />
        </header>
        <img
          src="doctor-image.png"
          alt="Doctor Illustration"
          className="h-auto p-12 w-[100%] object-cover"
        />
      </div>

      {/* Right Section for the Form */}
      <div className="lg:md:w-1/2 w-[100%] p-8 flex justify-center items-center">
        <div className="form-container max-w-[500px]">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Account Login
          </h2>
          <p className="text-gray-500 mb-6 pb-6 border-b border-b-gray-300">
            If you are already a member, please log in with your email and
            password.
          </p>
          <form onSubmit={submittion} className="space-y-4">
            <div className="">
              <label className="block text-gray-700 font-semibold">
                Email Address
              </label>
              <input
                type="text"
                name="Username"
                onChange={handle}
                className="w-full h-[55px] px-4 py-2 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="pb-4">
              <label className="block text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                name="Password"
                onChange={handle}
                className="w-full  h-[55px] px-4 py-2 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center pb-4">
              <input
                type="checkbox"
                name="rememberMe"
                className="h-4 w-4 text-primary focus:ring-blue-500 border-gray-300 rounded-sm"
              />
              <label className="ml-2 text-gray-500 font-medium text-sm">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full h-[55px] bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-gray-600 p-6 mb-6 flex justify-center">
            Don't have an account?&nbsp;
            <a href="/reg" className="text-primary hover:text-blue-700">
              Sign up here
            </a>
          </p>
          <p>{Resp}</p>
        </div>
      </div>
    </div>
  );
};
