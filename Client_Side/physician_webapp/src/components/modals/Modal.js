import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, return null (nothing is rendered)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute p-2 top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <IoIosCloseCircleOutline className="text-xl" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
