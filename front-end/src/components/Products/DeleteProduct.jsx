import React from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';

function DeleteProduct({ productId }) {

  const handleDelete = async () => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn không?',
        text: "Hành động này sẽ xóa sản phẩm!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        // Nếu người dùng xác nhận, thực hiện xóa sản phẩm
        await apiClient.delete(`api/Products/Delete/${productId}`);

        // Hiển thị thông báo thành công
        Swal.fire(
          'Đã xóa!',
          'Sản phẩm đã được xóa.',
          'success'
        );
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm!", error);

      // Hiển thị thông báo lỗi
      Swal.fire(
        'Lỗi!',
        'Có lỗi xảy ra khi xóa sản phẩm.',
        'error'
      );
    }
  };

  return (
    <button onClick={handleDelete}>
      Xóa Sản Phẩm
    </button>
  );
}

export default DeleteProduct;
