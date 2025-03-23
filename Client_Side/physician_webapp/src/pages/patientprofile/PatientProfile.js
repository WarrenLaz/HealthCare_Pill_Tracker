import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/modals/Modal";
import { BsPlusLg } from "react-icons/bs";
import Prescadd from "../../components/Prescadd";
import PatientInfoContainer from "./PatientInfoContainer";
import PrescriptionContainer from "./PrescriptionContainer";
import usePat from "../../hooks/usePat";
import GraphLogs from "./GraphLog";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import toast from "react-hot-toast";

export const PatientProfile = () => {
  const { auth } = useAuth();
  const { pat } = usePat();
  const [Precription, setPrescription] = useState(pat.Prescriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [isPatientDeleted, setIsPatientDeleted] = useState(false); // To track if the patient was deleted
  const prescriptionCount = Precription?.length || 0;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen); // Toggles delete confirmation modal
  };

  const addNewPrescription = (newPresc) => {
    setPrescription((prevPresc) => [...prevPresc, newPresc]);
  };

  // Handle Delete Prescription Function
  const handleDeletePrescription = async (id) => {
    try {
      await axiosPrivate.delete(`http://localhost:8000/prescription/${id}`, {
        headers: { Authorization: `Bearer ${auth.payload}` },
      });

      setPrescription((prev) =>
        prev.filter((prescription) => prescription._id !== id)
      );
      toast.success("Medication successfully removed");
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Error deleting prescription");
    }
  };

  // Handle Delete Patient Function
  const handleDeletePatient = async () => {
    try {
      await axiosPrivate.delete(`http://localhost:8000/patients/${pat._id}`, {
        headers: { Authorization: `Bearer ${auth.payload}` },
      });

      setIsPatientDeleted(true);
      console.log("Patient deleted successfully");

      // Redirect to another page after deletion
      setTimeout(() => {
        navigate("/Dashboard"); // Change this to the correct route
      }, 2000);
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  if (isPatientDeleted) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl">The patient has been deleted successfully.</h2>
        <p>You will be redirected soon.</p>
      </div>
    );
  }

  return (
    <div className="pr-12 pl-16 py-6 bg-secondary w-full h-full">
      <div className="relative w-full flex justify-between items-center">
        <h1 className="text-3xl">{`${pat.First_Name} ${pat.Last_Name}`}</h1>
        <button
          onClick={toggleDeleteModal}
          className="bg-black text-white py-2 px-6 rounded-lg"
        >
          Delete Patient
        </button>
      </div>

      <div className="flex flex-col sm:px-4 sm:py-6 md:flex-row bg-secondary w-full justify-center">
        {/*left side for user info*/}
        <div className=" sm:w-full md:w-full lg:w-1/2 flex flex-col justify-start items-center">
          <PatientInfoContainer />
          <GraphLogs className="mt-4" logs={pat.Logs} />
        </div>
        {/*right side for prescriptions*/}
        <div className="sm:w-full md:w-full lg:w-1/2">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Prescriptions ({Precription?.length || 0})
            </h2>
            <button
              onClick={toggleModal}
              className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center"
            >
              <BsPlusLg className="text-3xl color-[#001A72]" />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            {Precription.length > 0 ? (
              Precription.map((prec) => (
                <PrescriptionContainer
                  key={prec._id || prec.MedName}
                  prescData={prec}
                  onDelete={handleDeletePrescription}
                />
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal}>
        <div className="p-6">
          <h3 className="text-xl font-semibold">
            Are you sure you want to delete this patient?
          </h3>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleDeletePatient}
              className="bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Yes, Delete
            </button>
            <button
              onClick={toggleDeleteModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Prescription Modal */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Prescadd addNewPrescription={addNewPrescription} />
      </Modal>
    </div>
  );
};
