// src/components/Popup.js
import React from 'react';
import { BsX } from 'react-icons/bs';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <BsX className="text-xl" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;