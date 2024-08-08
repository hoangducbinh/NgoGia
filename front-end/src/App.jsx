import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Home2 from './Home2';
import FormXuatKho from './screens/FormXuatKho';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className='content'>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/formxuatkho" element={<FormXuatKho />} />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
