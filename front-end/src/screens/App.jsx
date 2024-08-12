// import { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import '../style/App.css';
// import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Home from '../components/Home';
// import Home2 from '../components/Home2';
// import FormXuatKho from '../components/FormXuatKho';


// function App() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };

//   return (
//     <Router>
//       <div className='grid-container'>
//         <Header OpenSidebar={OpenSidebar} />
//         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
//         <div className='content'>
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/home2" element={<Home2 />} />
//             <Route path="/formxuatkho" element={<FormXuatKho />} />
//             {/* <Route path="/login" element={<Login />} /> */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Home2 from '../components/Home2';
import FormXuatKho from '../components/FormXuatKho';
import '../style/App.css';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className='content'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/formxuatkho" element={<FormXuatKho />} />
          {/* Các route khác */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
