import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';

const CustomerForm = ({ customer, isAdding, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    receiver: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        customerName: customer.customerName || '',
        address: customer.address || '',
        receiver: customer.receiver || '',
        phoneNumber: customer.phoneNumber || ''
      });
    } else {
      setFormData({
        customerName: '',
        address: '',
        receiver: '',
        phoneNumber: ''
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isAdding) {
        await apiClient.post('/api/Customers/Create', formData);
      } else {
        await apiClient.put(`/api/Customers/Update/${customer.customerID}`, formData);
      }
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isAdding ? 'Add New Customer' : 'Edit Customer'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Receiver</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out">
            Cancel
          </button>
          <button 
            type="submit" 
            className={`px-4 py-2 ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out`}
            disabled={loading}>
            {isAdding ? 'Add Customer' : 'Update Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
