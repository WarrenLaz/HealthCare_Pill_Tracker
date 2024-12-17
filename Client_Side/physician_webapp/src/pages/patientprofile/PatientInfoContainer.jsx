import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import usePat from "../../hooks/usePat";

const PatientInfoContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { pat } = usePat();
  const [formData, setFormData] = useState({
    firstName: pat.patientData.First_Name,
    lastName: pat.patientData.Last_Name,
    email: pat.patientData.Email_Address,
    phoneNumber: pat.patientData.Phone_Number,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Patient Info</h1>
        <button
          onClick={toggleEdit}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          {isEditing ? <FiCheck size={20} /> : <FiEdit size={20} />}
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-500"
              />
            ) : (
              <p className="text-gray-800">{formData.firstName}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-500"
              />
            ) : (
              <p className="text-gray-800">{formData.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-500"
            />
          ) : (
            <p className="text-gray-800">{formData.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm">Phone Number</label>
          {isEditing ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-blue-500"
            />
          ) : (
            <p className="text-gray-800">{formData.phoneNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientInfoContainer;
