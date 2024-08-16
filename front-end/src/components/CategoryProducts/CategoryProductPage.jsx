import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';

const CategoryProductsPage = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await apiClient.get('/api/CategoryProducts/GetAll');
        setCategoryProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Bạn sẽ không thể hoàn tác điều này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xoá nó đi!'
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/api/CategoryProducts/Delete/${id}`);
        setCategoryProducts(categoryProducts.filter(cp => cp.categoryProductID !== id));
        Swal.fire(
          'Đã xoá!',
          'Danh mục đã được xoá.',
          'success'
        );
      } catch (error) {
        console.error('Lỗi khi xoá danh mục:', error);
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra khi xoá danh mục.',
          'error'
        );
      }
    }
  };

  const handleEditOrAdd = async (id = null) => {
    const categoryProduct = id 
      ? categoryProducts.find(cp => cp.categoryProductID === id)
      : { categoryProductName: '', categoryProductID: '' };
  
    const { value: formValues } = await Swal.fire({
      title: `<h2 style="color:#4A90E2;">${id ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục'}</h2>`,
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${id ? '' : `
            <input 
              id="categoryProductID" 
              class="swal2-input" 
              placeholder="Mã danh mục" 
              value="${categoryProduct?.categoryProductID || ''}" 
              style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
          `}
          <input 
            id="categoryProductName" 
            class="swal2-input" 
            placeholder="Tên danh mục" 
            value="${categoryProduct?.categoryProductName || ''}" 
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#4A90E2',
      cancelButtonColor: '#d33',
      confirmButtonText: id ? 'Cập nhật' : 'Thêm mới',
      cancelButtonText: 'Huỷ',
      preConfirm: () => {
        return id 
          ? { 
              categoryProductID: id,
              categoryProductName: document.getElementById('categoryProductName').value 
            }
          : {
              categoryProductID: document.getElementById('categoryProductID').value,
              categoryProductName: document.getElementById('categoryProductName').value
            };
      }
    });
  
    if (formValues) {
      try {
        if (id) {
          await apiClient.put(`/api/CategoryProducts/Update/${id}`, formValues);
          Swal.fire(
            'Đã cập nhật!',
            'Danh mục đã được cập nhật thành công.',
            'success'
          );
        } else {
          await apiClient.post('/api/CategoryProducts/Create', formValues);
          Swal.fire(
            'Đã thêm!',
            'Danh mục đã được thêm mới thành công.',
            'success'
          );
        }
  
        // Refresh category list
        const response = await apiClient.get('/api/CategoryProducts/GetAll');
        setCategoryProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lưu danh mục:', error);
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra khi lưu danh mục.',
          'error'
        );
      }
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Danh mục sản phẩm</h1>
      <button 
        onClick={() => handleEditOrAdd()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Thêm mới danh mục
      </button>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categoryProducts.map((categoryProduct) => (
              <tr key={categoryProduct.categoryProductID}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{categoryProduct.categoryProductID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{categoryProduct.categoryProductName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={() => handleEditOrAdd(categoryProduct.categoryProductID)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Chỉnh sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(categoryProduct.categoryProductID)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryProductsPage;
