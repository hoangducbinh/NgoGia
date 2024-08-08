import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from "./App";
import Login from './screens/Login';

function App1() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<App />} />
      </Routes>
    </Router>
  );
}

export default App1;
