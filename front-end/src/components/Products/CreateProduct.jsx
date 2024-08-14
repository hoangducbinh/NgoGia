import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';

function CreateProduct({ onClose, onSuccess }) {
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('api/CategoryProducts/GetAll');
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Ghi lại dữ liệu gửi đi để kiểm tra
      console.log('Sending data:', {
        productName,
        unit,
        price,
        categoryProduct: {
          categoryProductID: selectedCategory,
          categoryProductName: ''
        }
      });
  
      const response = await apiClient.post('api/Products/Create', {
        productName,
        unit,
        price,
        categoryProduct: {
          categoryProductID: selectedCategory,
          categoryProductName: ''
        }
      });
      // Xử lý thành công
      console.log("Product created:", response.data);
      if (onSuccess) onSuccess();
      resetForm();
    } catch (error) {
      // Ghi lại lỗi để phân tích
      console.error("There was an error creating the product!", error);
      if (error.response) {
        // In thông tin lỗi từ server
        console.error("Error response:", error.response.data);
      }
    }
  };
  

  const resetForm = () => {
    setProductName('');
    setUnit('');
    setPrice('');
    setSelectedCategory('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const selectedCategoryName = categories.find(category => category.categoryProductID === parseInt(selectedCategory))?.categoryProductName || 'Select a category';

  return (
    <div className="p-6 bg-white rounded-lg  max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input
            id="productName"
            type="text" 
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="unit" className="block text-gray-700 text-sm font-medium mb-2">Unit</label>
          <input
            id="unit"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange} // Xử lý thay đổi danh mục
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select a category</option>
            {categories.length > 0 ? (
              categories.map(category => (
                <option key={category.categoryProductID} value={category.categoryProductID}>
                  {category.categoryProductName}
                </option>
              ))
            ) : (
              <option value="" disabled>No categories available</option>
            )}
          </select>
          
        </div>
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
