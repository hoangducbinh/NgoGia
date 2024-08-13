import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css'; // Đảm bảo rằng bạn có tệp CSS tương ứng

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [cccd, setCccd] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Bạn có thể thêm logic để xử lý đăng ký ở đây

    alert('Đăng ký thành công!');
    navigate('/login');
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
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
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
          <label>Số CCCD</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
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
