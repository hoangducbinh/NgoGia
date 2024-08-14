import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import Popup from '../Popup';
import apiClient from '../../services/api';
import ProductPage from '../Products/ProductPage';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get('/api/Customers/GetAll');
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsAdding(false);
    setIsPopupOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsAdding(true);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (loading) {
    return <div className="p-6 max-w-screen-lg mx-auto">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Customer List</h1>
      <button 
        onClick={handleAddCustomer}
        className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
        Add New Customer
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">ID</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Name</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Address</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Receiver</th>
              <th className="py-3 px-6 text-left text-gray-600 font-medium">Phone Number</th>
              <th className="py-3 px-6 text-center text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.length > 0 ? (
              customers.map(customer => (
                <tr key={customer.customerID} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{customer.customerID}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{customer.customerName}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{customer.address}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{customer.receiver}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800">{customer.phoneNumber}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-center">
                    <button
                      onClick={() => handleViewDetails(customer)}
                      className="text-blue-600 hover:underline transition-colors duration-200">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-600">No customers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <CustomerForm customer={selectedCustomer} isAdding={isAdding} onClose={handleClosePopup} />
      </Popup>
    </div>
  );
};

export default CustomerPage;
