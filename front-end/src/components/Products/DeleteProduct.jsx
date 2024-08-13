import React from 'react';
import apiClient from '../../services/api';


function DeleteProduct({ productId }) {

  const handleDelete = async () => {
    try {
      await apiClient.delete(`api/Products/Delete/${productId}`);
      alert('Product deleted successfully!');
    } catch (error) {
      console.error("There was an error deleting the product!", error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete Product
    </button>
  );
}

export default DeleteProduct;
