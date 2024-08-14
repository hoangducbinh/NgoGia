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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <button 
        onClick={handleAddClick} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Add Product
      </button>
      <button 
        onClick={() => setShowCategoryPopup(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 ml-2"
      >
        Danh mục sản phẩm
      </button>
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
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Unit</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productID} className="border-t">
              <td className="p-4">{product.productID}</td>
              <td className="p-4">{product.productName}</td>
              <td className="p-4">{product.price} USD</td>
              <td className="p-4">{product.unit}</td>
              <td className="p-4">
                <button 
                  onClick={() => handleEditClick(product.productID)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteClick(product.productID)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
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
