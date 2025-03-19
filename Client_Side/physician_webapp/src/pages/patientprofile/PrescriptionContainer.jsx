import React from "react";
import { FaTrash } from "react-icons/fa";

const PrescriptionContainer = ({ prescData, onDelete }) => {
  if (!prescData) {
    return <p className="text-gray-600">Invalid prescription data</p>;
  }

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <h1 className="text-sm font-bold">
        {prescData.MedName} {prescData.Form} {prescData.Dosage} mg
      </h1>
      <p className="text-gray-600">
        Progress :{" "}
        <progress value={prescData.pills_left / prescData.Quantity} />
      </p>
      <p className="text-gray-600">Quantity: {prescData.Quantity || "N/A"}</p>
      <p className="text-gray-600">
        Pills Left: {prescData.pills_left || "N/A"}
      </p>
      <p className="text-gray-600">Interval: {prescData.Interval || "N/A"}</p>
      <p className="text-gray-600">
        Frequency:{" "}
        {Array.isArray(prescData.FrequencyDetails) &&
        prescData.FrequencyDetails.length > 0
          ? prescData.FrequencyDetails.map((freq, index) => (
              <span key={index}>
                {freq.pillCount} {freq.frequency}
                {index < prescData.FrequencyDetails.length - 1 && ", "}
              </span>
            ))
          : "N/A"}
      </p>
      <div className="flex justify-end ">
        <button
          className=" bottom-2 right-2 text-red-500 hover:text-red-700"
          onClick={() => onDelete(prescData._id)}
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default PrescriptionContainer;
