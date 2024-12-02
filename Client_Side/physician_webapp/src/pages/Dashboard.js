import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Patientadd } from "../components/Patientadd";
import Modal from "../components/modals/Modal";
import { BsPlusLg } from "react-icons/bs";
import PatientCount from "../components/mypatients_components/PatientCount";
import PatientsTable from "../components/mypatients_components/PatientsTable";

export const Dashboard = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log(auth.payload);
  return (
    <div className="px-12 py-6 bg-secondary">
      <h1 className="text-sm font-bold mb-4">WELCOME DR.{String(auth.payload.ln).toUpperCase()}</h1>
      <div className="flex justify-between items-center ">
        <h1 className="text-4xl">My Patients</h1>
        <button
          onClick={toggleModal}
          className="w-[100px] h-[100px] bg-white rounded-full flex justify-center items-center"
        >
          <BsPlusLg className="text-5xl color-[#001A72]" />
        </button>
      </div>
      <div className="flex mt-6 flex-col">
        <PatientCount />
        <PatientsTable />
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Patientadd />
      </Modal>
    </div>
  );
};
