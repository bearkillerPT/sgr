import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

const Register: React.FC<{ onRegister: (username: string, password: string) => void }> = ({ onRegister }) => {
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
        onRegister(username, password);
    };

    return (
        <div className="container">
            <h2 className='sectionHeader'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
            </form>
            <div className="register-link">
                Already have an account? <Link to="/">Login</Link>
            </div>
        </div>
    );
};

export default Register;
