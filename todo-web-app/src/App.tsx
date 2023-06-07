import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Login from './Screens/Login';
import TodoList from './Screens/TodoList';
import ListDetail from './Screens/ListDetail';
import Register from './Screens/Register';

// Mock data for user todo lists and entries
const mockTodoLists : {
  [username: string]: {
    id: number;
    name: string;
    entries: {
      id: number;
      text: string;
      completed: boolean;
    }[];
  }[];
}
 = {
  admin: [
    {
      id: 1,
      name: 'Work',
      entries: [
        { id: 1, text: 'Finish report', completed: false },
        { id: 2, text: 'Attend meeting', completed: true },
      ],
    },
    {
      id: 2,
      name: 'Personal',
      entries: [
        { id: 1, text: 'Go grocery shopping', completed: false },
        { id: 2, text: 'Exercise', completed: true },
        { id: 3, text: 'Read a book', completed: false },
      ],
    },
    // Add more todo lists as needed
  ],
};

// Handler for retrieving user's todo lists
const getUserTodoLists = (username: string) => {
  // Check if the user exists in the mock data
  if (mockTodoLists.hasOwnProperty(username)) {
    return mockTodoLists[username];
  } else {
    return [];
  }
};

const App: React.FC = () => {
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

  const handleRegister = (username: string, password: string) => {
    // Perform registration logic here
    // Send an AJAX request to the register.php endpoint or your preferred registration endpoint
    fetch('/register.php', {
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
          // Registration successful
          console.log('Registration successful');
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
    <Router>
      <div className='appHeader'>
        <h1 className='appHeaderTitle'>Manage your TODOs!</h1>
      </div>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/list" element={<TodoList />} />
        <Route path="/list/:listName" element={<ListDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
