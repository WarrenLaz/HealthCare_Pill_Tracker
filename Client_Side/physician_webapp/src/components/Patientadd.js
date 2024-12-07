import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const Patientadd = () => {
  const { auth } = useAuth();
  const [Resp, setResp] = useState("");
  const [RegForm, setRegForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email_Address: "",
    Phone_Number: "",
  });

  async function submittion(e) {
    e.preventDefault();
    console.log(RegForm);
    await axios
      .post("http://localhost:8000/patients", { RegForm },  {
        headers: {
          'Authorization': 'Bearer ' + String(auth.payload)
        }
      })
      .then((resp) => {
        console.log(resp.data);
        setResp(resp.data);
      });
  }

  const inputs = (e) => {
    setRegForm({ ...RegForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Add New Patient</h1>
      <form onSubmit={submittion} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="First_Name" className="text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            name="First_Name"
            onChange={inputs}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="Last_Name" className="text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="Last_Name"
            onChange={inputs}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="Email_Address" className=" text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="Email_Address"
            onChange={inputs}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="Phone_Number" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            name="Phone_Number"
            onChange={inputs}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all duration-300"
        >
          Submit
        </button>
      </form>
      {Resp && <div className="mt-4 text-green-500">{Resp}</div>}
    </div>
  );
};

export default Patientadd;
