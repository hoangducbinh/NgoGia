import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import { FaTags } from 'react-icons/fa';
import Swal from 'sweetalert2';

const CategoryProductPage = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProductName, setCategoryProductName] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState('');

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  const fetchCategoryProducts = async () => {
    try {
      const response = await apiClient.get('/api/CategoryProducts/GetAll');
      setCategoryProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch category products', error);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await apiClient.get(`/api/Products/GetByCategory/${categoryId}`);
      if (response.data.length === 0) {
        setNoProductsMessage('No products found in this category.');
      } else {
        setNoProductsMessage('');
      }
      setProductDetails(response.data);
    } catch (error) {
      console.error('Failed to fetch products by category', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category.categoryProductID);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setProductDetails([]);
    setNoProductsMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Chuẩn hóa tên danh mục
    const normalize = (str) => str.trim().toLowerCase();

    // Chuẩn hóa tên danh mục nhập vào
    const normalizedNewCategoryName = normalize(categoryProductName);

    // Kiểm tra trùng tên trong danh sách danh mục hiện tại
    const isDuplicate = categoryProducts.some(
      (category) => normalize(category.categoryProductName) === normalizedNewCategoryName
    );

    if (isDuplicate) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Category',
        text: 'This category name already exists.',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await apiClient.post('/api/CategoryProducts/Create', { categoryProductName });
      setCategoryProducts([...categoryProducts, response.data]); // Cập nhật danh sách ngay sau khi thêm
      setCategoryProductName('');
    } catch (error) {
      console.error('Failed to create category product', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Manage Category Products</h1>

      <form className="mb-12 flex flex-col md:flex-row items-center justify-center gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="p-4 border border-gray-300 rounded-lg flex-grow max-w-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryProductName}
          onChange={(e) => setCategoryProductName(e.target.value)}
          placeholder="Enter new category product"
          required
        />
        <button 
          type="submit" 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Create
        </button>
      </form>

      {!selectedCategory ? (
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-700 text-center">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categoryProducts.map((category) => (
              <div 
                key={category.categoryProductID}
                onClick={() => handleCategoryClick(category)}
                className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center cursor-pointer hover:bg-gray-100 transition duration-300"
              >
                <FaTags className="text-blue-500 text-4xl mb-4" />
                <span className="text-lg font-semibold text-gray-800">{category.categoryProductName}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={handleBackClick}
            className="mb-8 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            Back to Categories
          </button>

          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-700 text-center">Products in {selectedCategory.categoryProductName}</h2>
            {noProductsMessage ? (
              <p className="text-center text-red-500">{noProductsMessage}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {productDetails.map((product) => (
                  <div 
                    key={product.productID}
                    className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center hover:bg-gray-100 transition duration-300"
                  >
                    <FaTags className="text-blue-500 text-4xl mb-4" />
                    <span className="text-lg font-semibold text-gray-800">{product.productName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProductPage;
