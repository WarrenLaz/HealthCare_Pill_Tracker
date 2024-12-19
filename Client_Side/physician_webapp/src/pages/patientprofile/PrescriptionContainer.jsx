import React from "react";

const PrescriptionContainer = (Presc) => {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
                  <td className="px-4 py-2">{Presc.Name}</td>
                  <td className="px-4 py-2">{Presc.Quantity}</td>
                  <td className="px-4 py-2">{Presc.Dosage}</td>
                  <td className="px-4 py-2">{Presc.Units}</td>
    </div>
  );
};

export default PrescriptionContainer;
