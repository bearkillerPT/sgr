import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../App.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleRegister(username, password);
    };
    const handleRegister = (username: string, password: string) => {
        // Perform registration logic here
        // Send an AJAX request to the register.php endpoint or your preferred registration endpoint
        fetch('https://sgr2023.web.ua.pt/register.php', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                // Handle the response from the server
                if (data.success) {
                    // Registration successful
                    console.log('Registration successful');
                    setIsAuthenticated(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                    // Perform any necessary actions, such as redirecting to the login page or displaying a success message

                } else {
                    // Registration failed
                    console.error('Registration failed: js', data.message);
                    // Handle the error, such as displaying an error message to the user
                }
            })
            .catch(error => {
                console.error('Registration error:', error);
                // Handle any errors that occurred during the registration process
            });
    };
    return (
        <div className="container">
            {isAuthenticated && <h2 className='sectionHeader' style={{
                backgroundColor: 'green',
            }}>Registration successful!</h2>}
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
