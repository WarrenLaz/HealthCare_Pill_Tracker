import React, { useState, useEffect } from "react";
import { FiEdit, FiCheck } from "react-icons/fi";
import usePat from "../../hooks/usePat";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { formatInput } from "../../utils/formatInput";

const PatientInfoContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useAuth();
  const { pat, setPat } = usePat();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData({
      firstName: pat.First_Name,
      lastName: pat.Last_Name,
      email: pat.Email_Address,
      phoneNumber: pat.Phone_Number,
    });
  }, [pat]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formatInput(name, value),
    }));
  };

  const toggleEdit = () => {
    setError("");
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    // prevent unnecessary API calls if everything remains the same
    if (
      formData.firstName === pat.First_Name &&
      formData.lastName === pat.Last_Name &&
      formData.email === pat.Email_Address &&
      formData.phoneNumber === pat.Phone_Number
    ) {
      setIsEditing(false);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/patients/${pat._id}`,
        {
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email_Address: formData.email,
          Phone_Number: formData.phoneNumber,
        },
        {
          headers: { Authorization: `Bearer ${auth.payload}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // update local state to trigger rerender
        setPat((prevState) => ({
          ...prevState,
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email_Address: formData.email,
          Phone_Number: formData.phoneNumber,
        }));
        toggleEdit();
      }
    } catch (error) {
      console.error("Error updating patient info:", error);
      setError("Failed to update patient information. Please try again.");
    }
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Patient Info</h1>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-800 transition"
          >
            <FiCheck size={20} />
          </button>
        ) : (
          <button
            onClick={toggleEdit}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

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
                autoFocus
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
