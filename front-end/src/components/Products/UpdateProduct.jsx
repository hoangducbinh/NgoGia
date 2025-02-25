import React, { useState, useEffect,useRef  } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';


// Hàm định dạng giá
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN').format(value);
};

// Hàm để loại bỏ định dạng và lấy giá nguyên gốc
const parseCurrency = (value) => {
  return parseInt(value.replace(/\D/g, ''), 10);
};


function UpdateProduct({ productId, onClose, onUpdate }) {
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const sellPriceRef = useRef(null);
  const importPriceRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('api/CategoryProducts/GetAll');
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`api/Products/GetById/${productId}`);
        const product = response.data;
        setProductName(product.productName);
        setUnit(product.unit);
        setSellPrice(formatCurrency(product.sellPrice));
        setImportPrice(formatCurrency(product.importPrice));
        setDescription(product.description);
        setQuantity(product.quantity);
        setSelectedCategory(product.categoryProductID);
      } catch (error) {
        console.error("There was an error fetching the product details!", error);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.put(`api/Products/Update/${productId}`, {
        productId,
        productName,
        unit,
        sellPrice: parseCurrency(sellPrice),
        importPrice: parseCurrency(importPrice),
        description,
        quantity,
        categoryProductID: selectedCategory
      });

      if (onUpdate) onUpdate(); // Call onUpdate after success
      resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'The product has been updated successfully!',
        confirmButtonColor: '#3085d6',
      });

    } catch (error) {
      console.error("There was an error updating the product!", error);

      let errorMessage = 'There was an error updating the product!';
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

  const handlePriceChange = (setter, ref) => (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = formatCurrency(rawValue);
    
    setter(formattedValue);
    
    const cursorPosition = e.target.selectionStart + (formattedValue.length - e.target.value.length);
    
    setTimeout(() => {
      if (ref.current) {
        ref.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const resetForm = () => {
    setProductName('');
    setUnit('');
    setSellPrice('');
    setImportPrice('');
    setDescription('');
    setQuantity('');
    setSelectedCategory('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="p-8 bg-white rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Cập nhật sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Tên sản phẩm</label>
            <input
              placeholder='Ví dụ: Tủ lạnh, Máy in, ...'
              id="productName"
              type="text"
              value={productName}
              readOnly
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border border-gray-300 p-3 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="unit" className="block text-gray-700 text-sm font-medium mb-2">Đơn vị tính</label>
            <input
              placeholder='Ví dụ: hộp, chai, gói, ...'
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
              id="importPrice"
              type="text"
              value={importPrice}
              onChange={handlePriceChange(setImportPrice, importPriceRef)}
              ref={importPriceRef}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="sellPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá bán</label>
            <input
              id="sellPrice"
              type="text"
              value={sellPrice}
              onChange={handlePriceChange(setSellPrice, sellPriceRef)}
              ref={sellPriceRef}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Số lượng nhập</label>
            <input
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
              id="category"
              type="text"
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder='Mã sản phẩm'
              readOnly
              required
              className="border border-gray-300 bg-slate-100 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Mô tả sản phẩm</label>
          <textarea
            id="description"
            placeholder='Nhập mô tả sản phẩm (nếu có), ví dụ: Thành phần, cách sử dụng, ...'
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
            Hủy cập nhật
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
