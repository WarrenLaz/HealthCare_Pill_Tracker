import React, { useState, useEffect } from "react";
import { FiEdit, FiCheck } from "react-icons/fi";
import usePat from "../../hooks/usePat";
import useAuth from "../../hooks/useAuth";
import { formatInput } from "../../utils/formatInput";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import { z } from "zod";

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

const PatientInfoContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { auth } = useAuth();
  const { pat, setPat } = usePat();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: "", type: "" });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setFormData({
      firstName: pat.First_Name || "",
      lastName: pat.Last_Name || "",
      email: pat.Email_Address || "",
      phoneNumber: pat.Phone_Number || "",
    });
  }, [pat]);

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
      const validationErrors = {};
      err.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await axiosPrivate.put(
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
        setPat((prevState) => ({
          ...prevState,
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email_Address: formData.email,
          Phone_Number: formData.phoneNumber,
        }));
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setTimeout(() => toggleEdit(), 1500);
      }
    } catch (error) {
      setMessage({ text: "Error updating profile.", type: "error" });
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage({ text: "", type: "" });
  };

  return (
    <div className="border p-6 w-[90%] h-fit bg-white mt-4 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Patient Info</h1>
        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          {isEditing ? (
            <FiCheck size={20} className="text-green-600" />
          ) : (
            <FiEdit size={20} />
          )}
        </button>
      </div>
      {message.text && (
        <p
          className={`text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
      <div className="space-y-4">
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Email", name: "email" },
          { label: "Phone Number", name: "phoneNumber" },
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-600 text-sm">{label}</label>
            {isEditing ? (
              <input
                type={name === "email" ? "email" : "text"}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className={`border p-2 rounded-md text-gray-800 focus:outline-blue-500 ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
                autoFocus={name === "firstName"}
              />
            ) : (
              <p className="text-gray-800">{formData[name]}</p>
            )}
            {errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientInfoContainer;
