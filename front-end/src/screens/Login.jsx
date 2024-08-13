import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/login.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeUsername = 'hiep123';
    const fakePassword = '123';

    if (username === fakeUsername && password === fakePassword) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập vào localStorage
      console.log('Login success');
      alert('Đăng nhập thành công!');
      navigate('/home'); // Điều hướng đến trang Home
    } else {
      alert('Tài khoản hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>
      <form onSubmit={handleLogin}>
        <h2>WELCOME BACK</h2>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <label htmlFor="username">Tài khoản</label>
        </div>
        <div className="input-field">
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label htmlFor="password">Mật khẩu</label>
        </div>
        <button 
          type="submit" 
          className="btn-submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
