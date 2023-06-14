import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import Login from './Screens/Login';
import TodoList from './Screens/TodoList';
import ListDetail from './Screens/ListDetail';
import Register from './Screens/Register';
import { useState } from 'react';



const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string | undefined>(undefined);

  return (
    <Router>
      <div className='appHeader'>
        <h1 className='appHeaderTitle'>Manage your TODOs{isAuthenticated ? ", " + isAuthenticated: ""}!</h1>
      </div>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticatedParent={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list/" element={<TodoList user={isAuthenticated??""} />} />
        <Route path="/list/:listName" element={<ListDetail user={isAuthenticated??""} />} />
      </Routes>
    </Router>
  );
};

export default App;
