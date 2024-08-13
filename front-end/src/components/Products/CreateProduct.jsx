import React, { useState } from 'react';
import apiClient from '../../services/api';


function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = { productName, unit, price };

    try {
      await apiClient.post('api/Products/Create', newProduct);
      alert('Product created successfully!');
      setProductName('');
      setUnit('');
      setPrice('');
    } catch (error) {
      console.error("There was an error creating the product!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
      </div>
      <div>
        <label>Unit: </label>
        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} required />
      </div>
      <div>
        <label>Price: </label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateProduct;
