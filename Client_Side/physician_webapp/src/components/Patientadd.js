import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/axiosPrivate";
import { formatInput } from "../utils/formatInput";
import { z } from "zod";

const patientSchema = z.object({
  First_Name: z.string().min(1, "First Name is required"),
  Last_Name: z.string().min(1, "Last Name is required"),
  Email_Address: z
    .string()
    .email("Invalid email format")
    .min(1, "Email Address is required"),
  Phone_Number: z
    .string()
    .min(1, "Phone Number is required")
    .refine((val) => {
      return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(val);
    }, "Invalid phone number format"),
});

export const Patientadd = () => {
  const { auth } = useAuth();
  const [Resp, setResp] = useState("");
  const [errors, setErrors] = useState({});
  const [RegForm, setRegForm] = useState({
    First_Name: "",
    Last_Name: "",
    Email_Address: "",
    Phone_Number: "",
  });

  const axiosprivate = useAxiosPrivate();

  const handleValidation = () => {
    try {
      patientSchema.parse(RegForm);
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

  async function submittion(e) {
    e.preventDefault();
    if (!handleValidation()) return;

    try {
      const resp = await axiosprivate.post(
        "http://localhost:8000/patients",
        { RegForm },
        {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        }
      );
      setResp(resp.data); // Set the success response
      setErrors({}); // Clear errors on success
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrors({ server: error.response.data.error });
      } else {
        console.error("Error submitting form:", error);
      }
    }
  }

  const inputs = (e) => {
    const { name, value } = e.target;

    if (name === "Email_Address") {
      setRegForm({ ...RegForm, [name]: value.toLowerCase() });
    } else if (name === "Phone_Number") {
      let numericValue = value.replace(/\D/g, "");
      let formattedValue = numericValue
        .slice(0, 10)
        .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      setRegForm({ ...RegForm, [name]: formattedValue });
    } else {
      setRegForm({ ...RegForm, [name]: formatInput(name, value) });
    }
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-semibold mb-4">Add New Patient</h1>
      <form onSubmit={submittion} className="space-y-4">
        {[
          { label: "First Name", name: "First_Name", type: "text" },
          { label: "Last Name", name: "Last_Name", type: "text" },
          { label: "Email Address", name: "Email_Address", type: "email" },
          { label: "Phone Number", name: "Phone_Number", type: "text" },
        ].map((field) => (
          <div key={field.name} className="flex flex-col space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={RegForm[field.name]}
              onChange={inputs}
              className={`px-4 py-2 rounded-md border ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 ${
                errors[field.name] ? "focus:ring-red-500" : "focus:ring-primary"
              }`}
            />
            {errors[field.name] && (
              <span className="text-red-500 text-sm">{errors[field.name]}</span>
            )}
          </div>
        ))}
        {errors.server && (
          <span className="text-red-500 text-sm">{errors.server}</span>
        )}{" "}
        {/* Display server-side error */}
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all duration-300"
        >
          Submit
        </button>
      </form>
      {Resp && <div className="mt-4 text-green-500">{Resp}</div>}
    </div>
  );
};

export default Patientadd;
