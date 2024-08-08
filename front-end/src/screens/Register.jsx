import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/register.css"; // Sử dụng file CSS mới

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [cccd, setCccd] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Kiểm tra điều kiện đăng ký (ví dụ, mật khẩu phải khớp)
    if (password === confirmPassword) {
      alert('Đăng ký thành công!');
      navigate('/home');
    } else {
      alert('Mật khẩu không khớp!');
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">
        <img src="src/assets/logo.png" alt="Logo" />
      </div>
      <form onSubmit={handleRegister}>
        <h2>REGISTER</h2>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
          <label>Họ tên</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={cccd} 
            onChange={(e) => setCccd(e.target.value)} 
          />
          <label>CCCD</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
          <label>Số điện thoại</label>
        </div>
        <div className="input-field">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label>Email</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
          <label>Địa chỉ</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <label>Tài khoản</label>
        </div>
        <div className="input-field">
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label>Mật khẩu</label>
        </div>
        <div className="input-field">
          <input 
            type="password" 
            required 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          <label>Xác nhận mật khẩu</label>
        </div>
        <button 
          type="submit" 
          className="btn-submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
