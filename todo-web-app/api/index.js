const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    console.log(`Your public IP address is: ${ip}`);
  })
  .catch(error => {
    console.log('Error occurred while fetching the IP address:', error);
  });

//const express = require('express');
//const bodyParser = require('body-parser');
//const jwt = require('jsonwebtoken');
//const mysql = require('mysql');
//const app = express();
//
//// Middleware
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//
//// Create a MySQL connection
//const connection = mysql.createConnection({
//  host: 'localhost',
//  user: 'your-username',
//  password: 'your-password',
//  database: 'your-database',
//});
//
//// Connect to the MySQL database
//connection.connect((error) => {
//  if (error) {
//    console.error('Database connection failed:', error);
//  } else {
//    console.log('Connected to the database');
//  }
//});
//
//// Secret key for JWT
//const secretKey = 'your-secret-key';
//
//// Authentication middleware
//const authenticateUser = (req, res, next) => {
//  // Get the token from the request headers or query parameters
//  const token = req.headers.authorization || req.query.token;
//
//  if (!token) {
//    return res.status(401).json({ message: 'Authentication failed. Token not found' });
//  }
//
//  try {
//    // Verify and decode the token
//    const decoded = jwt.verify(token, secretKey);
//
//    // Find the user by ID and check if the token matches
//    connection.query('SELECT * FROM users WHERE id = ? AND token = ?', [decoded.id, token], (error, results) => {
//      if (error) {
//        console.error('Database error:', error);
//        return res.status(500).json({ message: 'Internal server error' });
//      }
//
//      if (results.length === 0) {
//        return res.status(401).json({ message: 'Authentication failed. Invalid token' });
//      }
//
//      // Add the authenticated user to the request object
//      req.user = results[0];
//
//      next();
//    });
//  } catch (error) {
//    return res.status(401).json({ message: 'Authentication failed. Invalid token' });
//  }
//};
//
//// Login route
//app.post('/api/login', (req, res) => {
//  const { username, password } = req.body;
//
//  // Find the user by username and password
//  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
//    if (error) {
//      console.error('Database error:', error);
//      return res.status(500).json({ message: 'Internal server error' });
//    }
//
//    if (results.length === 0) {
//      return res.status(401).json({ message: 'Authentication failed. Invalid username or password' });
//    }
//
//    const user = results[0];
//
//    // Generate a new token
//    const token = jwt.sign({ id: user.id }, secretKey);
//
//    // Update the user's token in the database
//    connection.query('UPDATE users SET token = ? WHERE id = ?', [token, user.id], (error) => {
//      if (error) {
//        console.error('Database error:', error);
//        return res.status(500).json({ message: 'Internal server error' });
//      }
//
//      res.json({ id: user.id, username: user.username, token });
//    });
//  });
//});
//
//// Registration route
//app.post('/api/register', (req, res) => {
//  const { username, password } = req.body;
//
//  // Check if the username already exists
//  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//    if (error) {
//      console.error('Database error:', error);
//      return res.status(500).json({ message: 'Internal server error' });
//    }
//
//    if (results.length > 0) {
//      return res.status(400).json({ message: 'Username already exists' });
//    }
//
//    // Insert the new user into the database
//    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error) => {
//      if (error) {
//        console.error('Database error:', error);
//        return res.status(500).json({ message: 'Internal server error' });
//      }
//
//      res.status(201).json({ message: 'Registration successful' });
//    });
//  });
//});
//
//// Your other routes for lists and list entries...
//
//// Start the server
//app.listen(80, () => {
//  console.log('Server is running on port 80');
//});
//