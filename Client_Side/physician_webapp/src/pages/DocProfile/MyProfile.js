import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DocInfoContainer from "./DocInfoContainer";

export const MyProfile = () => {
  const { auth } = useAuth();
  const [credentials, setCreds] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(auth.payload);
        const res = await axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: "Bearer " + String(auth.payload),
          },
        });
        console.log(res.data);
        setCreds(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Add delay before removing loading state
      }
    };

    fetchData();
  }, [auth.payload]);

  return (
    <div className="pr-12 pl-16 py-6 bg-secondary w-full h-full">
      <div className="flex-col items-center ">
        <h1 className="text-2xl font-semibold">
          {loading
            ? "Loading..."
            : `Welcome ${credentials.First_Name || "User"} ${
                credentials.Last_Name || ""
              }`}
        </h1>
      </div>
      <div className="flex mt-6 flex-col">
        <div className="flex justify-between"></div>

        {!loading && <DocInfoContainer />}
      </div>
    </div>
  );
};
