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
    <div className="pr-12 pl-16 py-6 bg-secondary w-full h-full">
      <div className="flex-col items-center ">
        <h1 className="text-3xl">Patient Name Goes Here</h1>
      </div>

      <div className="flex sm:flex-col md:flex-col lg:flex-row  px-4 py-6 bg-secondary w-full justify-center">
        {/*left side for user info*/}
        <div className=" sm:w-full md:w-full lg:w-1/2 flex flex-col justify-start items-center">
          <PatientInfoContainer />
        </div>
        {/*right side for prescriptions*/}
        <div className="sm:w-full md:w-full lg:w-1/2">
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
          <div className="flex flex-col justify-center items-center">
            <PrescriptionContainer />
            <PrescriptionContainer />
            <PrescriptionContainer />
            <PrescriptionContainer />
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
