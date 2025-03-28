import { IoIosCloseCircleOutline } from "react-icons/io";

const BatchModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen) return null;

  // Dummy data for requested medications
  const requestedMedications = [
    { name: "Amoxicillin", quantity: 30 },
    { name: "Ibuprofen", quantity: 60 },
    { name: "Metformin", quantity: 90 },
  ];

  // Handle Deny Action
  const handleDeny = () => {
    console.log("Batch request denied");
    onClose();
  };

  // Handle Fulfill Action
  const handleFulfill = () => {
    console.log("Batch request fulfilled");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        {/* Close (X) Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-all"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline size={32} />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3 text-center">
          General Information
        </h2>

        {patient && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>First Name:</strong> {patient.First_Name}
            </p>
            <p className="text-gray-700">
              <strong>Last Name:</strong> {patient.Last_Name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {patient.Email_Address}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {patient.Phone_Number}
            </p>
          </div>
        )}

        {/* Requested Medications Section */}
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Requested Medications:
        </h3>
        <div className="space-y-2">
          {requestedMedications.map((med, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <p className="text-gray-700">
                <strong>{med.name}</strong>
              </p>
              <p className="text-gray-500 text-sm">{med.quantity} tablets</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all w-1/2 mr-2"
            onClick={handleDeny}
          >
            Deny
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all w-1/2 ml-2"
            onClick={handleFulfill}
          >
            Fulfill
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchModal;
