import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import usePat from "../../hooks/usePat";
import { useNavigate, useLocation } from "react-router-dom";

const PatientsTable = () => {
  const { auth } = useAuth();
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosprivate = useAxiosPrivate();
  const { setPat } = usePat();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/PatientProfile";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosprivate.get("http://localhost:8000/patients", {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        });
        setPatients(res.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, [auth.payload]);

  const handleRowSubmit = (patientData) => {
    setPat(patientData);
    navigate(from, { replace: true });
  };

  const filteredPatients = patients.filter((patient) => {
    const query = searchQuery.toLowerCase();
    return (
      patient.First_Name?.toLowerCase().includes(query) ||
      patient.Last_Name?.toLowerCase().includes(query) ||
      patient.Phone_Number?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 px-4">
        {/* Search Bar */}
        <div className="bg-slate-50 w-full sm:w-3/5 h-10 rounded-full flex items-center px-4">
          <input
            type="text"
            placeholder="Search Patient by Name or Phone"
            className="bg-transparent outline-none w-full text-slate-600 placeholder-slate-400 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CiSearch className="text-lg" />
        </div>

        {/* Sort By Dropdown */}
        <div className="bg-slate-50 w-full sm:w-1/5 h-10 rounded-full flex items-center px-4">
          <select className="bg-transparent outline-none w-full text-slate-600 text-sm cursor-pointer">
            <option value="">Sort By</option>
            <option value="name">Alphabetical (A-Z)</option>
            <option value="option2">(another option here)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-50 p-4 sm:p-8 rounded-xl shadow-lg mt-6 overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          {/* Table Header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="text-gray-500 px-4 py-2 text-left font-semibold">
                First Name
              </th>
              <th className="text-gray-500 px-4 py-2 text-left font-semibold">
                Last Name
              </th>

              <th className="text-gray-500 px-4 py-2 text-left font-semibold">
                Phone Number
              </th>
              <th className="text-gray-500 px-4 py-2 text-left font-semibold"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b border-gray-300"
                >
                  <td className="px-4 py-2">{patient.First_Name}</td>
                  <td className="px-4 py-2">{patient.Last_Name}</td>
                  <td className="px-4 py-2">{patient.Phone_Number}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-[#e1f6df] text-[#5F8D4E] px-4 py-2 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out hover:bg-[#5F8D4E] hover:text-[#F4FFF3] hover:shadow-lg"
                      onClick={() => handleRowSubmit(patient)}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientsTable;
