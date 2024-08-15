import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // Thêm SweetAlert2
import apiClient from '../../services/api';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import '../../style/globals.css';
import Popup from '../Popup';
import CategoryProductPage from '../CategoryProducts/CategoryProductPage';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);

  useEffect(() => {
    apiClient.get('api/Products/GetAll')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleAddClick = () => {
    setShowCreate(true);
  };

  const handleEditClick = (productId) => {
    setEditingProductId(productId);
  };

  const handleDeleteClick = (productId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: "Hành động này sẽ xóa sản phẩm!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`api/Products/Delete/${productId}`)
          .then(() => {
            setProducts(products.filter(product => product.productID !== productId));
            Swal.fire(
              'Đã xóa!',
              'Sản phẩm đã được xóa.',
              'success'
            );
          })
          .catch(error => {
            console.error("There was an error deleting the product!", error);
            Swal.fire(
              'Lỗi!',
              'Có lỗi xảy ra khi xóa sản phẩm.',
              'error'
            );
          });
      }
    });
  };

  const closeCreatePopup = () => setShowCreate(false);
  const closeUpdatePopup = () => setEditingProductId(null);
  const closeCategoryPopup = () => setShowCategoryPopup(false);

  const handleCategoryClick = () => {
    navigate('/category-products');
  };

  const handleDescriptionEdit = (productId) => {
    const product = products.find(p => p.productID === productId);
    if (product) {
      setDescription(product.description);
      setShowDescriptionPopup(true);
    }
  };

  const handleDescriptionSave = () => {
    apiClient.put(`api/Products/Update/${editingProductId}`, { description })
      .then(() => {
        setProducts(products.map(product => 
          product.productID === editingProductId ? { ...product, description } : product
        ));
        setShowDescriptionPopup(false);
        Swal.fire(
          'Thành công!',
          'Mô tả sản phẩm đã được cập nhật.',
          'success'
        );
      })
      .catch(error => {
        console.error("There was an error updating the product!", error);
        Swal.fire(
          'Lỗi!',
          'Có lỗi xảy ra khi cập nhật mô tả sản phẩm.',
          'error'
        );
      });
  };

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
  });

  return (
    <div className=" mx-auto p-6 bg-gray-50 rounded-lg shadow-lg bg-gradient-to-r from-white/50 to-blue-500/50">
      <div className="flex justify-between mb-6">
        <button 
          onClick={handleAddClick} 
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Nhập hàng
        </button>
        <button 
          onClick={() => setShowCategoryPopup(true)}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Sản phẩm theo danh mục
        </button>
      </div>
      <Popup isOpen={showCreate} onClose={closeCreatePopup}>
        <CreateProduct 
          onClose={closeCreatePopup} 
          onSuccess={() => {
            closeCreatePopup();
            apiClient.get('api/Products/GetAll')
              .then(response => setProducts(response.data))
              .catch(error => console.error("Error refreshing product list", error));
          }} 
        />
      </Popup>
      <Popup isOpen={!!editingProductId} onClose={closeUpdatePopup}>
        <UpdateProduct
          productId={editingProductId}
          onUpdate={() => {
            closeUpdatePopup();
            apiClient.get('api/Products/GetAll')
              .then(response => setProducts(response.data))
              .catch(error => console.error("Error refreshing product list", error));
          }}
        />
      </Popup>
      <Popup width="max-w-[1000px]" isOpen={showCategoryPopup} onClose={closeCategoryPopup}>
        <CategoryProductPage onClose={closeCategoryPopup} />
      </Popup>
      <Popup isOpen={showDescriptionPopup} onClose={() => setShowDescriptionPopup(false)}>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Chỉnh sửa mô tả sản phẩm</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDescriptionSave}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
            >
              Lưu
            </button>
            <button
              onClick={() => setShowDescriptionPopup(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Hủy
            </button>
          </div>
        </div>
      </Popup>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-6  ">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="p-4 text-center">Mã Danh mục</th>
            <th className="p-4 text-center">Tên danh mục</th>
            <th className="p-4 text-center">Tên sản phẩm</th>
            <th className="p-4 text-center">Giá nhập</th>
            <th className="p-4 text-center">Giá bán</th>
            <th className="p-4 text-center">Số lượng tồn</th>
            <th className="p-4 text-center">Đơn vị tính</th>
            <th className="p-4 text-center">Mô tả sản phẩm</th>
            <th className="p-4 text-center">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productID} className="border-t hover:bg-blue-100 transition duration-200">
              <td className="p-4 text-center">{product.categoryProductID}</td>
              <td className="p-4 text-center">{product.categoryProductName}</td>
              <td className="p-4 text-center">{product.productName}</td>
              <td className="p-4 text-center">{formatter.format(product.importPrice)}</td>
              <td className="p-4 text-center">{formatter.format(product.sellPrice)}</td>
              <td className="p-4 text-center">{product.quantity}</td>
              <td className="p-4 text-center">{product.unit}</td>
              <td className="p-4 text-center">
                <button 
                  onClick={() => handleDescriptionEdit(product.productID)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 "
                >
                  Xem mô tả
                </button>
              </td>
              <td className="p-4 text-center">
                <button 
                  onClick={() => handleEditClick(product.productID)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 mr-2"
                >
                  Sửa
                </button>
                <button 
                  onClick={() => handleDeleteClick(product.productID)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default ProductPage;
