import React from "react";
import { PiPackageLight } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";

export const BatchCount = () => {
  const { auth } = useAuth();
  return (
    <div className="flex bg-white w-[21rem] rounded-xl px-6 py-3">
      <div>
        <PiPackageLight className="text-7xl" />
      </div>

      <div className="ml-4 flex flex-col  justify-center">
        <p className="text-md">Total Number of Batches:</p>
        <p className="text-sm">{1}</p> {/* replace with actual number*/}
      </div>
    </div>
  );
};

export default BatchCount;
