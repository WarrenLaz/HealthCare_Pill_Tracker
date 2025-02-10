import React from "react";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/modals/Modal";
import { BsPlusLg } from "react-icons/bs";
import Prescadd from "../../components/Prescadd";
import PatientInfoContainer from "./PatientInfoContainer";
import PrescriptionContainer from "./PrescriptionContainer";
import usePat from "../../hooks/usePat";
import GraphLogs from "./GraphLog";
export const PatientProfile = () => {
  const { auth } = useAuth();
  const { pat } = usePat();
  const [Precription, setPrescription] = useState(pat.Prescriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prescriptionCount = Precription?.length || 0;
  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const addNewPrescription = (newPresc) => {
    setPrescription((prevPresc) => [...prevPresc, newPresc]);
  };
  return (
    <div className="pr-12 pl-16 py-6 bg-secondary w-full h-full">
      <div className="flex-col items-center ">
        <h1 className="text-3xl">
          {String(pat.First_Name + " " + pat.Last_Name)}
        </h1>
      </div>

      <div className="flex flex-col sm:px-4 sm:py-6 md:flex-row bg-secondary w-full justify-center">
        {/*left side for user info*/}
        <div className=" sm:w-full md:w-full lg:w-1/2 flex flex-col justify-start items-center">
          <PatientInfoContainer />
          <GraphLogs className="mt-4" logs={pat.Logs}/>

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
            {Precription.length >= 0 ? (
              Precription.map((prec) => (
                <PrescriptionContainer
                  key={prec._id || prec.MedName}
                  prescData={prec}
                />
              ))
            ) : (
              <p>None</p>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Prescadd addNewPrescription={addNewPrescription} />
      </Modal>
    </div>
  );
};
