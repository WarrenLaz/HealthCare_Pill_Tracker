import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import BatchCount from "../BatchesPage/BatchCount";
import DocInfoContainer from "./DocInfoContainer";

export const MyProfile = () => {
  const { auth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credentials, setCreds] = useState({});

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(auth.payload);
        const res = await axios.get("http://localhost:8000/user", {
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
          Welcome Dr.{String(credentials.Last_Name)}
        </h1>
      </div>
      <div className="flex mt-6 flex-col">
        <div className="flex justify-between"></div>

        <DocInfoContainer />
      </div>
    </div>
  );
};
