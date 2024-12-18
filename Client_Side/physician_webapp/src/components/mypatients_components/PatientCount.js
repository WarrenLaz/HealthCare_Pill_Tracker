import React from "react";
import { PiUsersLight } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/axiosPrivate";

export const PatientCount = () => {
  const {auth} = useAuth();
  const [patient, setPatients] = useState([]);
  const axiosprivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosprivate.get("http://localhost:8000/patients", {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        });
        console.log(res.data);
        setPatients(res.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchData();
  }, [auth.payload]);

  return (
    <div 
    className="flex bg-white w-[21rem] rounded-xl px-6 py-3 
    transition-all duration-300 ease-in-out 
    hover:bg-[#e1f6df] hover:shadow-lg cursor-pointer"
  >
    <div>
      <PiUsersLight 
        className="text-7xl transition-all duration-300 ease-in-out hover:text-[#5F8D4E]" 
      />
    </div>

    <div className="ml-4 flex flex-col justify-center">
      <p className="text-md">Total Number of Patients:</p>
      <p className="text-sm transition-all duration-300 ease-in-out hover:text-[#5F8D4E]">
        {patient.length}
      </p>
    </div>
  </div>
  );
};

export default PatientCount;
