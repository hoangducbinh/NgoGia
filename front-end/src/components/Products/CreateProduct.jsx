import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';

function CreateProduct({ onClose, onSuccess }) {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
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

  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let categoryID = selectedCategory;
    
    if (categoryInput && !selectedCategory) {
      try {
        // Create new category if it doesn't exist
        const response = await apiClient.post('api/CategoryProducts/Create', {
          categoryProductName: categoryInput
        });
        categoryID = response.data.categoryProductID;
      } catch (error) {
        console.error("There was an error creating the category!", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating the category!',
          confirmButtonColor: '#d33',
        });
        return;
      }
    }

    try {
      await apiClient.post('api/Products/Create', {
        productID, // Based on your ID generation logic
        productName,
        unit,
        sellPrice,
        importPrice,
        description,
        quantity,
        categoryProductID: categoryID
      });

      if (onSuccess) onSuccess();
      resetForm();

      Swal.fire({
        icon: 'success',
        title: 'Product Created',
        text: 'The product has been created successfully!',
        confirmButtonColor: '#3085d6',
      });

    } catch (error) {
      console.error("There was an error creating the product!", error);

      let errorMessage = 'There was an error creating the product!';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === 'object') {
          errorMessage = JSON.stringify(error.response.data, null, 2);
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    }
  };

  const resetForm = () => {
    setProductID('');
    setProductName('');
    setUnit('');
    setSellPrice('');
    setImportPrice('');
    setDescription('');
    setQuantity('');
    setCategoryInput('');
    setSelectedCategory('');
  };

  return (
    <div className="p-8 bg-white rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Nhập hàng</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Tên sản phẩm</label>
            <input
              placeholder='Nhập tên sản phẩm'
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unit" className="block text-gray-700 text-sm font-medium mb-2">Đơn vị tính</label>
            <input
              placeholder='Ví dụ: Cái, Cuộn, Hộp, ...'
              id="unit"
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="importPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá nhập</label>
            <input
              placeholder='Nhập giá nhập'
              id="importPrice"
              type="number"
              value={importPrice}
              onChange={(e) => setImportPrice(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sellPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá bán</label>
            <input
              placeholder='Nhập giá bán'
              id="sellPrice"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Số lượng nhập</label>
            <input
              placeholder='Nhập số lượng'
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Mã sản phẩm</label>
            <input
              placeholder='Nhập mã hoặc tên danh mục'
              id="category"
              type="text"
              value={categoryInput}
              onChange={handleCategoryChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Mô tả sản phẩm</label>
          <textarea
            placeholder='Nhập mô tả sản phẩm (nếu có), ví dụ: Thành phần, cách sử dụng, ...'
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Hủy nhập
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Nhập hàng
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
