import React, { useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import usePat from "../hooks/usePat";
import Calendar from "react-calendar";
import useAuth from "../hooks/useAuth";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";

export const Prescadd = ({ addNewPrescription }) => {
  const [activeTab, setActiveTab] = useState("Search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [tempFrequency, setTempFrequency] = useState("");
  const [tempPillCount, setTempPillCount] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { pat } = usePat();
  const [errors, setErrors] = useState(0);

  const [drugs, setDrugs] = useState([]);

  const [prescData, setPrescData] = useState({
    id: pat._id,
    MedName: "",
    Dosage: "",
    Quantity: "",
    Form: "",
    FrequencyDetails: [],
    Interval: "",
    Note: "",
  });

  const frequencyOptions = [
    "Before Breakfast",
    "MidMorning",
    "At Breakfast",
    "At Lunch",
    "Midday",
    "At Dinner",
    "Before Bed",
  ];

  const frequencyDays = ["Daily", "Weekly"];

  const validateFields = () => {
    let newErrors = {};

    if (!prescData.MedName.trim()) newErrors.MedName = true;
    if (!prescData.Form.trim()) newErrors.Form = true;
    if (!String(prescData.Dosage).trim() || Number(prescData.Dosage) <= 0)
      newErrors.Dosage = true;
    if (!String(prescData.Quantity).trim() || Number(prescData.Quantity) <= 0)
      newErrors.Quantity = true;
    if (!prescData.Interval) newErrors.Interval = true;
    if (prescData.FrequencyDetails.length === 0)
      newErrors.FrequencyDetails = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submission = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      const missingTabs = {
        Details: ["MedName", "Form", "Dosage", "Quantity", "Note"],
        Schedule: ["Interval", "FrequencyDetails"],
      };

      for (let tab in missingTabs) {
        if (missingTabs[tab].some((field) => errors[field])) {
          setActiveTab(tab);
          break;
        }
      }
      return;
    }

    try {
      await axiosPrivate.post(
        "http://localhost:8000/prescription",
        { prescData },
        {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        }
      );

      addNewPrescription(prescData);
      toast.success("Medication successfully added!");
    } catch (error) {
      toast.error("Failed to add medication. Please try again.");
      console.error("Error adding prescription:", error);
    }
  };

  // handlea drug selection an  details
  const handleDrugSelect = (drug) => {
    setPrescData((prev) => ({
      ...prev,
      MedName: drug.Product_Name,
      Form: drug.Form,
      Quantity: drug.Net_Contents,
      Dosage: drug.Serving_Size,
      Note: drug.Suggested_Use,
    }));
    setSelectedDrug(drug);
    setActiveTab("Details");
  };

  const addFrequency = (frequency, pillCount) => {
    setPrescData((prev) => ({
      ...prev,
      FrequencyDetails: [...prev.FrequencyDetails, { frequency, pillCount }],
    }));
  };

  // Remove a frequency
  const removeFrequency = (index) => {
    setPrescData((prev) => {
      const updatedFrequencies = [...prev.FrequencyDetails];
      updatedFrequencies.splice(index, 1);
      return {
        ...prev,
        FrequencyDetails: updatedFrequencies,
      };
    });
  };

  async function handleSearch(val) {
    console.log(val);
    await axiosPrivate
      .post(
        "http://localhost:8000/search",
        { val },
        {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        }
      )
      .then((payload) => setDrugs(payload.data));
  }

  const handleInput = (e) => {
    console.log(e);
    setSearchQuery(e);
    handleSearch(e);
  };

  return (
    <div className="max-w-md mx-auto bg-white  rounded-lg overflow-hidden h-[500px] flex flex-col">
      {}
      <div className="px-6 py-4 border-b">
        <h2 className="text-2xl font-bold">Add New Prescription</h2>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        ></button>
      </div>

      {}
      <div className="flex border-b">
        {["Search", "Details", "Schedule"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 text-center py-2 font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {}
      <div
        className="flex-1 p-4 overflow-y-auto"
        style={{ maxHeight: "calc(600px - 120px)" }}
      >
        {activeTab === "Search" && (
          <div>
            <input
              type="text"
              placeholder="Search Name"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchQuery}
              onChange={(e) => {
                handleInput(e.target.value);
              }}
            />
            <div>
              {drugs.map((drug) => (
                <div
                  key={drug._id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleDrugSelect(drug)}
                >
                  <div>
                    <p className="font-bold">{`${drug.Product_Name}\n`}</p>
                    <p className="font-style: italic">
                      {`Form: ${drug.Form}`}{" "}
                    </p>
                    <p className="font-style: italic">{`Quantity: ${drug.Net_Contents}`}</p>
                    <p className="font-style: italic">{`Dosage: ${drug.Serving_Size}`}</p>
                  </div>{" "}
                </div>
              ))}
            </div>
          </div>
        )}

        {/*Details*/}
        {activeTab === "Details" && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Medication Name"
              className={`w-full p-2 border rounded ${
                errors.MedName ? "border-red-500" : "border-gray-300"
              }`}
              value={prescData.MedName}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, MedName: e.target.value }))
              }
              required
            />
            <input
              type="number"
              placeholder="Dosage"
              className={`w-full p-2 border rounded ${
                errors.MedName ? "border-red-500" : "border-gray-300"
              }`}
              value={prescData.Dosage}
              onChange={(e) => {
                const value = e.target.value;

                setPrescData((prev) => ({ ...prev, Dosage: value }));
              }}
              required
            />

            <input
              type="text"
              placeholder="Form (e.g., Tablet)"
              className={`w-full p-2 border rounded ${
                errors.MedName ? "border-red-500" : "border-gray-300"
              }`}
              value={prescData.Form}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, Form: e.target.value }))
              }
              required
            />

            <input
              type="number"
              placeholder="Quantity"
              className={`w-full p-2 border rounded ${
                errors.MedName ? "border-red-500" : "border-gray-300"
              }`}
              value={prescData.Quantity}
              onChange={(e) => {
                const value = e.target.value;

                setPrescData((prev) => ({ ...prev, Quantity: value }));
              }}
              required
            />
            <textarea
              placeholder="Special Instructions (e.g., take with food)"
              className="w-full p-2 border rounded resize-none"
              value={prescData.Note}
              onChange={(e) =>
                setPrescData((prev) => ({
                  ...prev,
                  Note: e.target.value,
                }))
              }
            ></textarea>
          </div>
        )}
        {/*Schedule*/}
        {activeTab === "Schedule" && (
          <div>
            <h3 className="font-medium">Select Intervals: </h3>
            <select
              className="p-2 border rounded w-full mb-4"
              value={prescData.Internval}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, Interval: e.target.value }))
              }
            >
              <option value="">Select Intervals</option>
              {frequencyDays.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <h3 className="font-medium">Add Time/Frequency:</h3>
            <div className="flex items-center space-x-2">
              <select
                className="p-2 border rounded w-full"
                value={tempFrequency}
                onChange={(e) => setTempFrequency(e.target.value)}
              >
                <option value="">Select Time</option>
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Count"
                className="p-2 border rounded w-20"
                value={tempPillCount}
                onChange={(e) => setTempPillCount(e.target.value)}
              />
            </div>
            <button
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                if (tempFrequency && tempPillCount) {
                  addFrequency(tempFrequency, tempPillCount);
                  setTempFrequency("");
                  setTempPillCount("");
                } else {
                  alert("Please select a frequency and enter a pill count.");
                }
              }}
            >
              Add Frequency
            </button>
            <div className="mt-2">
              {prescData.FrequencyDetails.map((freq, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>
                    {freq.pillCount} - {freq.frequency}
                  </span>
                  <button
                    onClick={() => removeFrequency(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {}
      <div className="px-6 py-4 ">
        <button
          onClick={submission}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Medication
        </button>
      </div>
    </div>
  );
};

export default Prescadd;
