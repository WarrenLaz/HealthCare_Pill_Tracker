import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Modal from "../../components/modals/Modal";
import { BsPlusLg } from "react-icons/bs";
import Prescadd from "../../components/Prescadd";
import PatientInfoContainer from "./PatientInfoContainer";
import PrescriptionContainer from "./PrescriptionContainer";

export const PatientProfile = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log(auth.payload);
  return (
    <div className="flex-col sm px-12 py-6 bg-secondary w-full h-full">
      <h1 className="text-3xl">Patient Name Goes Here</h1>
      <div className=" flex px-12 py-6 bg-secondary w-full h-full">
        {/*left side for user info*/}
        <div className="bg-secondary w-1/2 flex-col justify-center items-center align-middle">
          <PatientInfoContainer />
        </div>
        {/*right side for prescriptions*/}
        <div className="bg-secondary w-1/2">
          <div className="flex justify-between items-center p-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Prescriptions (4) {/*Change this here to get actual number*/}
            </h2>
            <button
              onClick={toggleModal}
              className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center"
            >
              <BsPlusLg className="text-3xl color-[#001A72]" />
            </button>
          </div>
          <div>
            <PrescriptionContainer />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Prescadd />
      </Modal>
    </div>
  );
};
