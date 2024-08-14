import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '../src/components/Header';
import Sidebar from '../src/components/Sidebar';
import Home from '../src/components/Home';
import FormXuatKho from '../src/components/FormXuatKho';
import Login from '../src/screens/Login';
import ProductPage from './components/Products/ProductPage';
import CustomerPage from './components/Customers/CustomerPage';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsInitialized(true);
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        ) : (
          <Route
            path="*"
            element={
              <div className="flex h-screen">
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                <div
                  className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
                    openSidebarToggle ? 'ml-64 md:ml-72 lg:ml-80' : 'ml-0'
                  }`}
                >
                  <Header OpenSidebar={OpenSidebar} />
                  <main className="flex-1 p-4 bg-gray-100">
                    <Routes>
                    <Route path="/formxuatkho" element={<FormXuatKho />} />
                      <Route path="/home" element={<Home />} />
                      
                      <Route path='/product' element={<ProductPage />} />
                      <Route path='/customer' element={<CustomerPage />} />
                      <Route path="*" element={<Navigate to="/product" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        )}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/product" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
