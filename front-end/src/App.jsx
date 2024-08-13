import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../src/style/App.css';
import Header from '../src/components/Header';
import Sidebar from '../src/components/Sidebar';
import Home from '../src/components/Home';
import Home2 from '../src/components/Home2';
import FormXuatKho from '../src/components/FormXuatKho';
import Login from '../src/screens/Login';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); // Trạng thái khởi tạo

  useEffect(() => {
    // Giả sử bạn có logic để kiểm tra trạng thái đăng nhập từ localStorage hoặc API
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
    setIsInitialized(true); // Sau khi kiểm tra trạng thái đăng nhập
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!isInitialized) {
    return <div>Loading...</div>; // Hiển thị một màn hình tải trong khi trạng thái đăng nhập đang được kiểm tra
  }

  return (
    <Router>
      <div   className='grid-container'>
        {isLoggedIn ? (
          <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className='content'>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/home2" element={<Home2 />} />
                <Route path="/formxuatkho" element={<FormXuatKho />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
