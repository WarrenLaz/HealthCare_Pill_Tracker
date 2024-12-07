import React from "react";
import { CiSearch } from "react-icons/ci";
import dummyPatients from "./dummypatient";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";


const PatientsTable = () => {
  const{auth} = useAuth();
  const [patient, setPatients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const keys = auth.payload.p; // Extract keys from auth
        console.log(keys);
        const res = await axios.get("http://localhost:8000/patients", 
          {
            headers: {
              'Authorization': 'Bearer ' + String(auth.payload)
            }
          });
        console.log(res.data);
        setPatients(res.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, [auth.payload.p]); 

  
  return (
    <div>
      <div className="flex justify-between px-16 pt-12">
        {/* Search Bar */}
        <div className="bg-slate-50 w-[800px] h-9 rounded-full flex items-center px-4">
          <input
            type="text"
            placeholder="Search Patient"
            className="bg-transparent outline-none w-full text-slate-600 placeholder-slate-400"
          />
          <CiSearch className="text-lg" />
        </div>

        {/* Sort By Dropdown */}
        <div className="bg-slate-50 w-64 h-9 rounded-full flex items-center px-4">
          <select className="bg-transparent outline-none w-full text-slate-600 cursor-pointer">
            <option value="">
              Sort By
            </option>
            <option value="name">Alphabetical (A-Z)</option>
            <option value="option2">(another option here)</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-xl shadow-lg mt-6">
        <table className="min-w-full table-auto">
          {/* Table Header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                First Name
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                Last Name
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                Email
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                Phone Number
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* Map over the dummy data */}
            {patient.map((patient, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{patient.First_Name}</td>
                <td className="px-4 py-2">{patient.Last_Name}</td>
                <td className="px-4 py-2">{patient.Email_Address}</td>
                <td className="px-4 py-2">{patient.Phone_Number}</td>
                <td className="px-4 py-2">
                  <button className="bg-[#e1f6df] text-[#5F8D4E] px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#5F8D4E] hover:text-[#F4FFF3] hover:shadow-lg">
                    <p className="font-semibold">Manage</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTable;
