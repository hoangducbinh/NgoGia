import { useEffect, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username'); // Retrieve username from localStorage
    setName(storedName);
  }, []);

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        {/* <BsFillBellFill className='icon'/>
        <BsFillEnvelopeFill className='icon'/> */}
        <BsPersonCircle className='icon' />
        {name && <span className='username' style={{ color: 'white' }}>{name}</span>}
      </div>
    </header>
  );
}

export default Header;


// import { useState, useEffect } from 'react';
// import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsCaretDown } from 'react-icons/bs';
// import { useNavigate } from 'react-router-dom';

// function Header({ OpenSidebar }) {
//   const [name, setName] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedName = localStorage.getItem('username'); // Retrieve username from localStorage
//     setName(storedName);
//   }, []);
//  useEffect(() => {

//  });
//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('username');
//     setName(''); // Clear name state
//     navigate('/login'); // Redirect to Login page
//   };

//   return (
//     <header className='header'>
//       <div className='menu-icon'>
//         <BsJustify className='icon' onClick={OpenSidebar} />
//       </div>
//       <div className='header-left'>
//         <BsSearch className='icon' />
//       </div>
//       <div className='header-right'>
//         {/* <BsFillBellFill className='icon'/>
//         <BsFillEnvelopeFill className='icon'/> */}
//         <div className='user-menu' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//           <BsPersonCircle className='icon' />
//           <span className='username' style={{ color: 'white' }}>{name}</span>
//           <BsCaretDown className='icon' />
//           {isDropdownOpen && (
//             <div className='dropdown-menu'>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
