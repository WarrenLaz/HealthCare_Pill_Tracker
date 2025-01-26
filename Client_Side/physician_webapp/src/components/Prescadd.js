import React, { useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import usePat from "../hooks/usePat";
import Calendar from "react-calendar";
import useAuth from "../hooks/useAuth";
import "react-calendar/dist/Calendar.css";

export const Prescadd = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [selectedDays, setSelectedDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [tempFrequency, setTempFrequency] = useState("");
  const [tempPillCount, setTempPillCount] = useState("");
  const [date, setDate] = useState(new Date());
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { pat } = usePat();
  // dummy data for drugs
  const [drugs, setDrugs] = useState([]);

  const [prescData, setPrescData] = useState({
    id: pat._id,
    MedName: "",
    Dosage: "",
    Units: "",
    Form: "",
    RouteOfAdmin: "",
    FrequencyDetails: [],
    Startdate: "",
    Quantity: "",
    Note: "",
    Schedule: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
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

  async function submission(e){
    console.log(prescData);
    e.preventDefault();
    await axiosPrivate.post("http://localhost:8000/prescription", {prescData},{
    headers: {
      'Authorization': 'Bearer ' + String(auth.payload)
    }}).then(data => console.log(data))
  }
  // filter drugs based on the search query
  const filteredDrugs = drugs.filter((drug) =>
    `${drug.name} ${drug.dosage} ${drug.form}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // handlea drug selection an  details
  const handleDrugSelect = (drug) => {
    setPrescData((prev) => ({
      ...prev,
      MedName: drug.Product_Name,
      Form: drug.Form,
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
    await axiosPrivate.post("http://localhost:8000/search", {val},{
    headers: {
      'Authorization': 'Bearer ' + String(auth.payload)
    }}).then(payload => setDrugs(payload.data))
  }

  const handleInput = (e) => {
      console.log(e);
      setSearchQuery(e);
      handleSearch(e);
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden h-[500px] flex flex-col">
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
              onChange={(e) => {handleInput(e.target.value)} }
            />
            <div>
            {drugs.map((drug) => (
                <div
                  key={drug._id}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleDrugSelect(drug)}
                >
                  <div>{`${drug.Product_Name} ${drug.Brand_Name} ${drug.Form}`}</div>{" "}
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
              className="w-full p-2 border rounded"
              value={prescData.MedName}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, MedName: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Dosage"
              className="w-full p-2 border rounded"
              value={prescData.Dosage}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, Dosage: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Units"
              className="w-full p-2 border rounded"
              value={prescData.Units}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, Units: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Form (e.g., Tablet)"
              className="w-full p-2 border rounded"
              value={prescData.Form}
              onChange={(e) =>
                setPrescData((prev) => ({ ...prev, Form: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Route of Administration"
              className="w-full p-2 border rounded"
              value={prescData.RouteOfAdmin}
              onChange={(e) =>
                setPrescData((prev) => ({
                  ...prev,
                  RouteOfAdmin: e.target.value,
                }))
              }
            />
            <div>
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

            <input
              type="number"
              placeholder="Quantity"
              className="w-full p-2 border rounded"
              value={prescData.Quantity}
              onChange={(e) =>
                setPrescData((prev) => ({
                  ...prev,
                  Quantity: e.target.value,
                }))
              }
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
          <div className="space-y-3">
            <div className="app">
              <h1 className="text-center">Schedule</h1>
              <div className="calendar-container">
                <Calendar onChange={setDate} value={date} />
              </div>
              <p className="text-center">
                <span className="bold">Selected Date:</span>{" "}
                {date.toDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {}
      <div className="px-6 py-4 bg-gray-50">
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
