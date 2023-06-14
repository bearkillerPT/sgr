import React, { useState } from 'react';

import '../App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Login: React.FC<{ setIsAuthenticatedParent: React.Dispatch<React.SetStateAction<string | undefined>> }> = ({
    setIsAuthenticatedParent
}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState<string | undefined>(undefined);

    const handleLogin = (username: string, password: string) => {
        // Perform login logic here
        // Send an AJAX request to the login.php endpoint or your preferred authentication endpoint
        fetch('/login.php', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                if (data.success) {
                    // Login successful
                    console.log('Login successful');
                    setIsAuthenticated(username);
                    setIsAuthenticatedParent(username);
                    navigate('/list/');
                    // Perform any necessary actions, such as updating the user's authentication status or redirecting to another page
                } else {
                    // Login failed
                    console.error('Login failed:', data.message);
                    // Handle the error, such as displaying an error message to the user
                }
            })
            .catch(error => {
                console.error('Login error:', error);
                // Handle any errors that occurred during the login process
            });
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleLogin(username, password);

    };

    return (
        <div className="container">
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