import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className='flex items-center justify-between p-4 bg-blue-800 text-white shadow-lg'>
      <div className='flex items-center'>
        <BsJustify 
          className='text-2xl cursor-pointer hover:text-gray-200 transition-colors duration-300' 
          onClick={OpenSidebar} 
        />
      </div>
      <div className='flex items-center flex-1 mx-4'>
        <form onSubmit={handleSearchSubmit} className='relative flex items-center w-full max-w-md ml-auto'>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
          />
          <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors duration-300'>
            <BsSearch className='text-xl' />
          </button>
        </form>
      </div>
      <div className='flex items-center space-x-4'>
        <BsFillBellFill className='text-xl cursor-pointer hover:text-gray-200 transition-colors duration-300' />
        <BsFillEnvelopeFill className='text-xl cursor-pointer hover:text-gray-200 transition-colors duration-300' />
        <BsPersonCircle className='text-xl cursor-pointer hover:text-gray-200 transition-colors duration-300' />
      </div>
    </header>
  );
}

export default Header;
