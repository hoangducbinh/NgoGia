import React from 'react';
import { BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCardText } from 'react-icons/bs';
import logo from '../assets/logo.png';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full bg-white text-gray-800 transition-transform duration-300 ease-in-out transform ${
        openSidebarToggle ? 'translate-x-0' : '-translate-x-full'
      } w-64 md:w-72 lg:w-80 shadow-lg z-40`}
    >
      <div className='flex items-center justify-between p-4 bg-gradient-to-r from-white/50 to-blue-500/50 backdrop-blur-md'>
        <img src={logo} alt='Logo' className='w-32 md:w-36 lg:w-40' />
        <button onClick={OpenSidebar} className='text-2xl text-gray-500 hover:text-gray-700 md:hidden'>
          &times;
        </button>
      </div>
      <ul className='mt-4'>
        <li className='p-4 hover:bg-gray-200'>
          <a href="/product" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsGrid1X2Fill className='mr-3 text-xl' /> Quản lý sản phẩm
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="/formxuatkho" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsCardText className='mr-3 text-xl' /> Xuất hóa đơn
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="/customer" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsFillGrid3X3GapFill className='mr-3 text-xl' /> Quản lý khách hàng
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsPeopleFill className='mr-3 text-xl' /> null
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsListCheck className='mr-3 text-xl' /> Inventory
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsMenuButtonWideFill className='mr-3 text-xl' /> Reports
          </a>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <a href="" className='flex items-center text-gray-800 hover:text-blue-600'>
            <BsFillGearFill className='mr-3 text-xl' /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
