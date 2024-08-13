import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';


function UpdateProduct({ productId, onUpdate }) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    apiClient.get(`api/Products/GetbyId/${productId}`)
      .then(response => {
        setProduct(response.data);
        setName(response.data.name);
        setPrice(response.data.price);
      })
      .catch(error => {
        console.error("There was an error fetching the product!", error);
      });
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = { productID: productId, name, price };

    try {
      await apiClient.put(`api/Products/Update/${productId}`, updatedProduct);
      alert('Product updated successfully!');
      onUpdate(); // Notify parent component to refresh
    } catch (error) {
      console.error("There was an error updating the product!", error);
    }
  };

  if (!product) return null;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Product</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price: </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateProduct;
