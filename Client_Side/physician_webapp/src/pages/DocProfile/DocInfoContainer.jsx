import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { formatInput } from "../../utils/formatInput";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import { z } from "zod";

// Define validation schema with Zod
const profileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required")
    .refine(
      (val) => /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val),
      "Invalid phone number format"
    ),
});

const DocInfoContainer = () => {
  const { auth } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [credentials, setCreds] = useState({});
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [resp, setResp] = useState("");
  const [status, setStatus] = useState(""); // success | error
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/user", {
          headers: { Authorization: "Bearer " + String(auth.payload) },
        });
        setCreds(res.data);
      } catch (error) {
        console.error("Error fetching doctor info:", error);
      }
    };

    fetchData();
  }, [auth.payload]);

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
  }, [credentials]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setFormData({ ...formData, [name]: value.toLowerCase() });
    } else if (name === "phoneNumber") {
      let numericValue = value.replace(/\D/g, "").slice(0, 10);
      let formattedValue = numericValue.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
      );
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: formatInput(name, value) });
    }
  };

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      const formattedErrors = err.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosPrivate.put(
        `http://localhost:8000/user/${credentials.id}`,
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
        setResp("Profile updated successfully.");
        setStatus("success");
        setCreds({
          ...credentials,
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email_Address: formData.email,
          Phone_Number: formData.phoneNumber,
        });
        setIsEditing(false);
      }
    } catch (error) {
      setResp("Error updating physician info.");

      setStatus("error");
      console.error("Error updating physician info", error);
    }
  };

  if (!credentials) return <div>Loading...</div>;

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 w-[90%] h-fit bg-white mt-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-600 hover:text-gray-900 transition"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-600 text-sm capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
            {isEditing ? (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className={`border p-2 rounded-md text-gray-800 focus:outline-blue-500 ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
            ) : (
              <p className="text-gray-800">{formData[field]}</p>
            )}
            {errors[field] && (
              <span className="text-red-500 text-sm">{errors[field]}</span>
            )}
          </div>
        ))}
      </div>

      {resp && (
        <div
          className={`mt-4 ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {resp}
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-500 py-2"
          >
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
