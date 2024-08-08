import React, { useState } from "react";
import "../style/login.css";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div class="wrapper">
            <div className="logo">
                <img src="src/assets/img/logo.png" alt="Logo" />
            </div>
            <form action="#">
                <h2>WELCOME BACK</h2>
                <div class="input-field">
                    <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Tài khoản</label>
                </div>
                <div class="input-field">
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Mật khẩu</label>
                </div>
                <button type="submit" onClick={handleLogin} className="btn-submit">Log In</button>
            </form>
        </div>
    )
}
export default Login;