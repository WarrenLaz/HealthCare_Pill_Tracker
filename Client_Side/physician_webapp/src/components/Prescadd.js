import React, { useState } from "react";
import useAxiosPrivate from "../hooks/axiosPrivate";
import usePat from "../hooks/usePat";

export const Prescadd = () => {
  const [activeTab, setActiveTab] = useState("Search");
  const [selectedDays, setSelectedDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [frequency, setFrequency] = useState("");
  const { pat } = usePat();
  // Dummy data for drugs
  const drugs = [
    {
      name: "Aspirin",
      dosage: "500mg",
      route: "Oral",
      form: "Tablet",
    },
    {
      name: "Amoxicillin",
      dosage: "250mg",
      route: "Oral",
      form: "Capsule",
    },
  ];

  const [prescData, setPrescData] = useState({
    id: pat._id,
    MedName: "",
    Dosage: "",
    Form: "",
    RouteOfAdmin: "",
    Frequency: "",
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

  // Filter drugs based on the search query
  const filteredDrugs = drugs.filter((drug) =>
    `${drug.name} ${drug.dosage} ${drug.form}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle drug selection and auto-fill details
  const handleDrugSelect = (drug) => {
    setPrescData((prev) => ({
      ...prev,
      MedName: drug.name,
      Dosage: drug.dosage,
      Form: drug.form,
      RouteOfAdmin: drug.route,
    }));
    setSelectedDrug(drug);
    setActiveTab("Details");
  };

  // Toggle days selection
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

    setPrescData((prev) => ({
      ...prev,
      Schedule: {
        ...prev.Schedule,
        [day]: prev.Schedule[day] || [],
      },
    }));
  };

  const handleFrequencyChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Update the search query for the dropdown
    setPrescData((prev) => ({
      ...prev,
      Frequency: value, // Directly update the Frequency field
    }));
  };

  // Clear Frequency
  const clearFrequency = () => {
    setSearchQuery(""); // Clear the search query
    setFrequency(""); // Clear the selected frequency
    setPrescData((prev) => ({
      ...prev,
      Frequency: "", // Reset Frequency in prescData
    }));
  };

  // Frequency Select Update
  const handleFrequencySelect = (selectedFrequency) => {
    setFrequency(selectedFrequency.meaning);
    setPrescData((prev) => ({
      ...prev,
      Frequency: selectedFrequency.meaning,
    }));
    setSearchQuery(""); // Clear the search field
  };

  // Add time to a specific day
  const addTime = (day, time) => {
    setPrescData((prev) => ({
      ...prev,
      Schedule: {
        ...prev.Schedule,
        [day]: [...new Set([...(prev.Schedule[day] || []), time])],
      },
    }));
  };

  // Remove time
  const removeTime = (day, time) => {
    setPrescData((prev) => ({
      ...prev,
      Schedule: {
        ...prev.Schedule,
        [day]: (prev.Schedule[day] || []).filter((t) => t !== time),
      },
    }));
  };
  // Select all days
  const selectAllDays = () => {
    setSelectedDays(daysOfWeek);
    setPrescData((prev) => ({
      ...prev,
      Schedule: daysOfWeek.reduce((acc, day) => {
        acc[day] = prev.Schedule[day] || [];
        return acc;
      }, {}),
    }));
  };
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const quickTimes = {
    Morning: "Morning",
    Afternoon: "Afternoon",
    Night: "Night",
  };
  const abbreviationOptions = [
    { abbreviation: "BID", meaning: "Twice a Day" },
    { abbreviation: "TID", meaning: "Three Times a Day" },
    { abbreviation: "QID", meaning: "Four Times a Day" },
    { abbreviation: "PRN", meaning: "As Needed" },
    { abbreviation: "QOD", meaning: "Every Other Day" },
    { abbreviation: "HS", meaning: "At Bedtime" },
    { abbreviation: "AC", meaning: "Before Meals" },
    { abbreviation: "PC", meaning: "After Meals" },
    { abbreviation: "QAM", meaning: "Every Morning" },
    { abbreviation: "QPM", meaning: "Every Evening" },
  ];

  // filters through objects (insuring lower case comparision) when searching th
  const filteredAbbreviations = abbreviationOptions.filter(
    (option) =>
      option.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.meaning.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = () => {
    console.log(prescData);
  };

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

      {/* Tabs */}
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

      {/* Tab Content */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              {filteredDrugs.map((drug) => (
                <div
                  key={drug.name}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleDrugSelect(drug)}
                >
                  <div>{`${drug.name} ${drug.form} ${drug.dosage}`}</div>{" "}
                </div>
              ))}
            </div>
          </div>
        )}

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
            <div className="relative">
              <input
                type="text"
                placeholder="Frequency"
                className="w-full p-2 border rounded pr-10" // Extra padding for the "X"
                value={prescData.Frequency}
                onChange={handleFrequencyChange}
              />
              {prescData.Frequency && (
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={clearFrequency}
                  aria-label="Clear Frequency"
                >
                  &times; {/* X icon */}
                </button>
              )}
              {/* Dropdown */}
              {searchQuery && (
                <div className="absolute w-full bg-white shadow-lg mt-1 max-h-40 overflow-y-auto border border-gray-300 rounded">
                  {filteredAbbreviations.map((option) => (
                    <div
                      key={option.abbreviation}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleFrequencySelect(option)}
                    >
                      <strong>{option.abbreviation}</strong> - {option.meaning}
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown */}
              {searchQuery && (
                <div className="absolute w-full bg-white shadow-lg mt-1 max-h-40 overflow-y-auto border border-gray-300 rounded">
                  {filteredAbbreviations.map((option) => (
                    <div
                      key={option.abbreviation}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleFrequencySelect(option)}
                    >
                      <div>{option.meaning}</div> {}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder="Start Date (mm/dd/yyyy)"
              className="w-full p-2 border rounded"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) =>
                setPrescData((prev) => ({
                  ...prev,
                  Startdate: e.target.value,
                }))
              }
            />

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

        {activeTab === "Schedule" && (
          <div className="space-y-3">
            {/* Select All Button */}
            <button
              onClick={selectAllDays}
              className="mb-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Select All Days
            </button>

            {/* Day Selection */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Select Days:</h3>
              <div className="grid grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`p-2 border rounded ${
                      selectedDays.includes(day)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div
              className="mb-4 overflow-y-auto"
              style={{
                maxHeight: "200px",
                borderTop: "1px solid #ddd",
                overflowY: "auto",
              }}
            >
              {selectedDays.map((day) => (
                <div key={day} className="mb-4 border-b pb-2">
                  <h3 className="font-medium">{day}</h3>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {prescData.Schedule[day]?.map((time) => (
                      <span
                        key={time}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded cursor-pointer"
                        onClick={() => removeTime(day, time)}
                      >
                        {time} &times;
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {Object.entries(quickTimes).map(([label, time]) => (
                      <button
                        key={time}
                        onClick={() => addTime(day, time)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Summary */}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Current Schedule:</h3>
              <div className="overflow-y-auto" style={{ maxHeight: "100px" }}>
                {Object.entries(prescData.Schedule).map(
                  ([day, times]) =>
                    times.length > 0 && (
                      <div key={day}>
                        <strong>{day}:</strong> {times.join(", ")}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Medication
        </button>
      </div>
    </div>
  );
};

export default Prescadd;
