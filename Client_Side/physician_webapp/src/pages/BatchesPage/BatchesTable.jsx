import React from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import usePat from "../../hooks/usePat";
import useAxiosPrivate from "../../hooks/axiosPrivate";

const BatchesTable = ({ onRowSubmit }) => {
  const { auth } = useAuth();
  const [patients, setPatients] = useState([]);
  const axiosprivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosprivate.get("http://localhost:8000/patients", {
          headers: { Authorization: "Bearer " + String(auth.payload) },
        });
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, [auth.payload]);

  return (
    <div>
      <div className="flex justify-between px-4 pt-6">
        {/* Search Bar */}
        <div className="bg-slate-50 w-3/5 h-9 rounded-full flex items-center px-4">
          <input
            type="text"
            placeholder="Search Patient"
            className="bg-transparent outline-none w-full text-slate-600 placeholder-slate-400"
          />
          <CiSearch className="text-lg" />
        </div>

        {/* Sort By Dropdown */}
        <div className="bg-slate-50 w-1/5 h-9 rounded-full flex items-center px-4">
          <select className="bg-transparent outline-none w-full text-slate-600 cursor-pointer">
            <option value="">Sort By</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-xl shadow-lg mt-6">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                First Name
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                Last Name
              </th>
              <th className="text-gray-500 px-4 py-2 text-left text-sm font-semibold">
                Date Requested
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

          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 border-b border-gray-300"
              >
                <td className="px-4 py-2">{patient.First_Name}</td>
                <td className="px-4 py-2">{patient.Last_Name}</td>
                <td className="px-4 py-2">12/01/24</td>
                <td className="px-4 py-2">{patient.Email_Address}</td>
                <td className="px-4 py-2">{patient.Phone_Number}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-[#e1f6df] text-[#5F8D4E] px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#5F8D4E] hover:text-[#F4FFF3] hover:shadow-lg"
                    onClick={() => onRowSubmit(patient)}
                  >
                    <p className="font-semibold">Fulfill</p>
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

export default BatchesTable;
