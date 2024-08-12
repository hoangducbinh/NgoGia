import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from "./screens/App";
import Login from './screens/Login';
function App1() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <App /> : <Navigate to="/home" />} 
        />
      </Routes>
    </Router>
  );
}

export default App1;
