import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { formatInput } from "../../utils/formatInput";
import useAxiosPrivate from "../../hooks/axiosPrivate";

const DocInfoContainer = () => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [credentials, setCreds] = useState({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(auth.payload);
        const res = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        });
        console.log(res.data); // Update state with the fetched data
        setCreds(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, [auth.payload]); // Only runs when auth.payload changes

  useEffect(() => {
    if (credentials) {
      setFormData({
        id: credentials._id,
        firstName: credentials.First_Name,
        lastName: credentials.Last_Name,
        email: credentials.Email_Address,
        phoneNumber: credentials.Phone_Number,
      });
    }
  }, [credentials]); // Runs only when credentials change

  console.log(credentials);
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

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const response = await axiosPrivate.put(
        `http://localhost:8000/user/${credentials.id}`, // Ensure credentials._id is correct here
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
        // Update local state to reflect changes
        setCreds((prevState) => ({
          ...prevState,
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email_Address: formData.email,
          Phone_Number: formData.phoneNumber,
        }));
        toggleEdit();
      }
    } catch (error) {
      console.error("Error updating physician info:", error);
      setError("Failed to update physician information. Please try again.");
    }
  };

  if (!credentials) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
        {!isEditing && (
          <button
            onClick={toggleEdit}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <FiEdit size={20} />{" "}
          </button>
        )}
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
      {isEditing && (
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleCancel} className=" text-gray-500 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-primary text-white rounded-md px-4 py-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default DocInfoContainer;
