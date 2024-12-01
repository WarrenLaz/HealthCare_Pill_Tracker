import React from "react";
import { CiSearch } from "react-icons/ci";
import dummyPatients from "./dummypatient";

const PatientsTable = () => {
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
            <option value="" disabled selected>
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
            {dummyPatients.map((patient, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{patient.firstName}</td>
                <td className="px-4 py-2">{patient.lastName}</td>
                <td className="px-4 py-2">{patient.email}</td>
                <td className="px-4 py-2">{patient.phoneNumber}</td>
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
