import React from "react";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Patientadd } from "../components/Patientadd";
import Modal from "../components/modals/Modal";
import { BsPlusLg } from "react-icons/bs";
import PatientCount from "../components/mypatients_components/PatientCount";
import PatientsTable from "../components/mypatients_components/PatientsTable";
import useAxiosPrivate from "../hooks/axiosPrivate";

export const Dashboard = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCreds] = useState({});
  const axiosPrivate = useAxiosPrivate();

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  {
    /*Getting data from users using the auth JWT refer to the CRUD folder, user refers to current user*/
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(auth.payload);
        const res = await axiosPrivate.get("http://localhost:8000/user", {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        });
        console.log(res.data); // Update state with the fetched data
        setCreds(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchData();
  }, [auth.payload]);

  console.log(auth.payload);
  return (
    <div className="pr-12 pl-16 py-6 bg-secondary w-full h-full">
      <div className="flex-col items-center ">
        <h1 className="text-2xl font-semibold">
          {" "}
          Welcome {String(credentials.First_Name)}{" "}
          {String(credentials.Last_Name)}
        </h1>
      </div>
      <div className="flex mt-6 flex-col">
        <div className="flex justify-between">
          {/*Patient Count refer to components/mypatients_components/PatientCount.js/*/}
          <PatientCount />
          <button
            onClick={toggleModal}
            className="flex items-center justify-center w-[100px] h-[100px] rounded-full bg-white 
      transition-all duration-300 ease-in-out 
      hover:bg-[#e1f6df] hover:shadow-lg cursor-pointer"
          >
            <BsPlusLg
              className="text-5xl text-[#001A72] 
        transition-all duration-300 ease-in-out 
        hover:text-[#006400]"
            />
          </button>
        </div>

        <PatientsTable />
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <Patientadd />
      </Modal>
    </div>
  );
};
