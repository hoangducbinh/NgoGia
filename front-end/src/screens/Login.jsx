import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/login.css";
import apiClient from "../services/api";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Trạng thái cho thông báo lỗi
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Gọi API để xác thực người dùng
      const response = await apiClient.post('api/Employees/Login', {
        userName: username,
        password: password,
        rememberMe: true // Đặt theo nhu cầu
      });

      if (response.status === 200) {
        // Xử lý đăng nhập thành công
        const { token } = response.data;
        localStorage.setItem('token', token); // Lưu token vào localStorage
        setIsLoggedIn(true);
        console.log('Đăng nhập thành công');
        alert('Đăng nhập thành công!');
        navigate('/home'); // Chuyển hướng đến trang Home
      } else {
        // Xử lý khi đăng nhập thất bại
        setError('Tài khoản hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      // Xử lý lỗi từ API
      if (error.response) {
        // Nếu lỗi có phản hồi từ server
        setError(`Lỗi: ${error.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'}`);
      } else {
        // Nếu lỗi không có phản hồi từ server
        setError('Đã xảy ra lỗi. Vui lòng kiểm tra kết nối mạng.');
      }
      console.error('Lỗi đăng nhập:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>
      <form onSubmit={handleLogin}>
        <h2>WELCOME BACK</h2>
        {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi */}
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
          Đăng Nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
