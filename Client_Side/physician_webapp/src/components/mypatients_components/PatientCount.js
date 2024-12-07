import React from "react";
import { PiUsersLight } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";

export const PatientCount = () => {
  const {auth} = useAuth();
  return (
    <div className="flex bg-white w-[21rem] rounded-xl px-6 py-3">
      <div>
        <PiUsersLight className="text-7xl" />
      </div>

      <div className="ml-4 flex flex-col  justify-center">
        <p className="text-md">Total Number of Patients:</p>
        <p className="text-sm">{1}</p> {/* replace with actual number*/}
      </div>
    </div>
  );
};

export default PatientCount;
