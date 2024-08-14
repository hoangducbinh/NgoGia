import React from 'react';
import { BsGrid1X2Fill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsCardText } from 'react-icons/bs';
import logo from '../assets/logo.png';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
<<<<<<< HEAD
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                {/* <BsCart3  className='icon_header'/> SHOP */}
                <img src={logo} alt='' className='logo' width={150} />
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>x</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/home">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/formxuatkho">
                    <BsCardText className='icon'/> Xuất phiếu bán hàng
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/login">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Customers
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
=======
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-300 transition-transform duration-300 ease-in-out transform ${
        openSidebarToggle ? 'translate-x-0' : '-translate-x-full'
      } w-64 md:w-72 lg:w-80 z-40`}
    >
      <div className='flex items-center justify-between p-4 bg-gray-800'>
        <img src={logo} alt='Logo' className='w-32 md:w-36 lg:w-40' />
        <button onClick={OpenSidebar} className='text-2xl text-red-500 hover:text-red-400 md:hidden'>
          &times;
        </button>
      </div>
      <ul className='mt-4'>
        <li className='p-4 hover:bg-gray-700'>
          <a href="/product" className='flex items-center text-gray-300 hover:text-white'>
            <BsGrid1X2Fill className='mr-3 text-xl' /> Quản lý sản phẩm
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="/formxuatkho" className='flex items-center text-gray-300 hover:text-white'>
            <BsCardText className='mr-3 text-xl' /> Xuất hóa đơn
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="/customer" className='flex items-center text-gray-300 hover:text-white'>
            <BsFillGrid3X3GapFill className='mr-3 text-xl' /> Quản lý khách hàng
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="" className='flex items-center text-gray-300 hover:text-white'>
            <BsPeopleFill className='mr-3 text-xl' /> null
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="" className='flex items-center text-gray-300 hover:text-white'>
            <BsListCheck className='mr-3 text-xl' /> Inventory
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="" className='flex items-center text-gray-300 hover:text-white'>
            <BsMenuButtonWideFill className='mr-3 text-xl' /> Reports
          </a>
        </li>
        <li className='p-4 hover:bg-gray-700'>
          <a href="" className='flex items-center text-gray-300 hover:text-white'>
            <BsFillGearFill className='mr-3 text-xl' /> Setting
          </a>
        </li>
      </ul>
>>>>>>> 0a3c429b350d79b7f9c209272f368070c1df116e
    </aside>
  );
}

export default Sidebar;
