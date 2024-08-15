import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import Swal from 'sweetalert2';

function UpdateProduct({ productId, onUpdate }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [categoryProduct, setCategoryProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch the product details and categories when productId changes
    const fetchProductDetails = async () => {
      try {
        const response = await apiClient.get(`api/Products/GetbyId/${productId}`);
        setProduct(response.data);
        setName(response.data.productName);
        setPrice(response.data.sellPrice);
        setUnit(response.data.unit);
        setCategoryProduct(response.data.categoryProduct);
      } catch (error) {
        console.error("There was an error fetching the product!", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('api/CategoryProducts/GetAll');
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error fetching categories!", error);
      }
    };

    fetchProductDetails();
    fetchCategories();
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Create the updated product object
    const updatedProduct = {
      productID: productId,
      productName: name,
      unit,
      price,
      categoryProduct: {
        categoryProductID: categoryProduct.categoryProductID,
        categoryProductName: categoryProduct.categoryProductName
      }
    };
    console.log("Sending the following data to update the product:", updatedProduct);
    try {
      await apiClient.put(`api/Products/Update/${productId}`, updatedProduct);
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: `Product "${name}" updated successfully with price $${price}!`,
        confirmButtonText: 'OK'
      });
      onUpdate(); // Notify parent component to refresh
    } catch (error) {
      console.error("There was an error updating the product!", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating the product. Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!product) return null;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Update Product</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Unit:</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category:</label>
        <select
          value={categoryProduct ? categoryProduct.categoryProductID : ''}
          onChange={(e) => {
            const selectedCategory = categories.find(cat => cat.categoryProductID === parseInt(e.target.value));
            setCategoryProduct(selectedCategory);
          }}
          required
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.categoryProductID} value={category.categoryProductID}>
              {category.categoryProductName}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateProduct;
