import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z
  .object({
    Practice_Email_Address: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .min(1, "Password is required"),
    Confirm_Password: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long")
      .min(1, "Confirm Password is required"),
    First_Name: z.string().min(1, "First Name is required"),
    Last_Name: z.string().min(1, "Last Name is required"),

    Practice_Phone_Number: z
      .string()
      .min(1, "Phone Number is required")
      .refine((val) => {
        // Check if the phone number follows a simple US format
        return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val);
      }, "Invalid phone number format"),
  })
  .refine((data) => data.Password === data.Confirm_Password, {
    message: "Passwords don't match",
    path: ["Confirm_Password"],
  });

export const Reg = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    //console.log(data)
    try {
      const response = await axios.post(
        "http://localhost:8000/Registration",
        {data}
      );
      alert("Registration successful");
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was an issue with the registration");
    }
  };
  return (
    <div className="min-h-screen flex lg:flex-row md:flex-row flex-col">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Account Sign Up
          </h2>
          <p className="text-gray-500 mb-6 pb-6 border-b border-b-gray-300">
            Become a member and make managing your patients easier.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label htmlFor="First_Name">First Name</label>
              <input
                type="text"
                {...register("First_Name")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.First_Name ? "border-red-500" : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />
              {errors.First_Name && (
                <span className="text-red-500">
                  {errors.First_Name.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="Last_Name">Last Name</label>
              <input
                type="text"
                {...register("Last_Name")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.Last_Name ? "border-red-500" : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />
              {errors.Last_Name && (
                <span className="text-red-500">{errors.Last_Name.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="Practice_Email_Address">
                Email Address
              </label>
              <input
                type="text"
                {...register("Practice_Email_Address")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.Practice_Email_Address
                    ? "border-red-500"
                    : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />
              {errors.Practice_Email_Address && (
                <span className="text-red-500">
                  {errors.Practice_Email_Address.message}
                </span>
              )}
            </div>


            <div>
              <label htmlFor="Practice_Phone_Number">
                Phone Number
              </label>

              <input
                type="text"
                {...register("Practice_Phone_Number")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.Practice_Phone_Number
                    ? "border-red-500"
                    : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />

              {errors.Practice_Phone_Number && (
                <span className="text-red-500">
                  {errors.Practice_Phone_Number.message}
                </span>
              )}

            </div>

            <div>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                {...register("Password")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.Password ? "border-red-500" : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />
              {errors.Password && (
                <span className="text-red-500">{errors.Password.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="Confirm_Password">Confirm Password</label>
              <input
                type="password"
                {...register("Confirm_Password")}
                className={`w-full h-[45px] px-4 py-2 mt-2 mb-2 border rounded-lg focus:outline-none ${
                  errors.Confirm_Password ? "border-red-500" : "border-gray-500"
                } focus:ring-2 focus:ring-primary`}
              />
              {errors.Confirm_Password && (
                <span className="text-red-500">
                  {errors.Confirm_Password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[55px] bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors mt-4"
            >
              Submit
            </button>
          </form>

          <p className="text-gray-600 p-6 mb-6 flex justify-center">
            Already have an account?&nbsp;
            <a href="/Login" className="text-primary hover:text-blue-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
