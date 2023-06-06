import React, { useState } from 'react';

import '../App.css';
import { Link } from 'react-router-dom';


const Login: React.FC<{ onLogin: (username: string, password: string) => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="container">
            <h2 className='sectionHeader'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        className='loginInput'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='loginInput'
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
            <div className="register-link">
                Don't have an account? <Link className='noDecoratorLink' to="/register">Register</Link>
            </div>
        </div>
    );
};
export default Login;