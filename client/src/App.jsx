// client/src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AuthForm from './components/AuthForm';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Still need this for initial check
  const API_URL = 'http://localhost:5000/api/todos'; // Your local backend URL for now
  const AUTH_API_URL = 'http://localhost:5000/api/auth';
  const navigate = useNavigate();

  // --- Function to handle user login/registration submission ---
  const handleAuthSubmit = async (formData, type) => {
      try {
          const url = type === 'login' ? `${AUTH_API_URL}/login` : `${AUTH_API_URL}/register`;
          const response = await axios.post(url, formData);

          const { token, ...userData } = response.data;
          localStorage.setItem('authToken', token);
          setUser(userData);
          navigate('/'); // Redirect to home/todo page after successful auth
          console.log(`${type} successful:`, userData);
      } catch (error) {
          console.error(`Error during ${type}:`, error.response?.data?.message || error.message);
          alert(error.response?.data?.message || `Failed to ${type}. Please try again.`);
      }
  };

  // --- Modified: Basic check for existing token on app load ---
  useEffect(() => {
      const checkAuthStatus = async () => {
          const token = localStorage.getItem('authToken');
          if (token) {
              // In a real app, you'd send this token to your backend to verify
              // and fetch actual user data. For this project, we'll assume valid.
              setUser({ username: "Authenticated User" }); // Placeholder user
              setLoading(false); // Authentication check is complete
              // No need to navigate here, as the Route component will handle it.
          } else {
              setUser(null); // Explicitly set user to null
              setLoading(false); // Authentication check is complete
              // If no token, and not already on login/register page, navigate to login
              if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                  navigate('/login');
              }
          }
      };
      checkAuthStatus();
  }, [navigate]); // Depend on navigate to ensure it's stable

  // --- Logout function ---
  const handleLogout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/login');
      console.log("User logged out.");
  };

  // --- Your existing Todo functions (handleAddTodo, handleDeleteTodo, handleToggleComplete) ---
  // These functions will need to send the JWT token with requests later when routes are protected.
  useEffect(() => {
    const fetchTodos = async () => {
      // Only fetch todos if user is not loading AND user object exists
      if (!loading && user) {
        try {
          const response = await axios.get(API_URL);
          setTodos(response.data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      }
    };
    // Trigger fetch if user status changes (e.g., logs in) and not loading
    if (!loading) {
       fetchTodos();
    }
  }, [user, loading]); // Depend on user and loading state

  const handleAddTodo = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (idToDelete) => {
    try {
      await axios.delete(`${API_URL}/${idToDelete}`);
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== idToDelete));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (idToToggle) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === idToToggle);
      if (!todoToUpdate) return;
      const updatedStatus = !todoToUpdate.completed;
      const response = await axios.put(`${API_URL}/${idToToggle}`, { completed: updatedStatus });

      setTodos((prevTodos) =>
        prevTodos.map(todo =>
          todo._id === idToToggle ? response.data : todo
        )
      );
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  // --- Modified Return Statement ---
  // If still loading, just show the loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg text-dark-text text-xl font-bold">
        Loading...
      </div>
    );
  }

  // Once loading is false, render the main app structure with routes
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <div className="bg-dark-card p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform hover:scale-[1.005] transition-transform duration-200 border border-gray-700 relative">

        {/* Logout button (visible only if user exists) */}
        {user && (
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
                Logout
            </button>
        )}

        <Routes>
          {/* Login and Register routes are publicly accessible */}
          <Route path="/login" element={<AuthForm type="login" onSubmit={(formData) => handleAuthSubmit(formData, 'login')} />} />
          <Route path="/register" element={<AuthForm type="register" onSubmit={(formData) => handleAuthSubmit(formData, 'register')} />} />

          {/* Main To-Do App Route (Conditionally Rendered/Protected) */}
          <Route path="/" element={
            user ? ( // If user is logged in, show the To-Do app content
                <>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-accent-blue mb-6 tracking-tight text-center">
                    My Pro To-Do List
                  </h1>
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-6 py-2 border-b border-gray-700 gap-4">
                    <p className="text-dark-text-muted text-sm md:text-base italic flex-grow text-center sm:text-left">
                      Future smart features go here: Filters, Search, etc.
                    </p>
                    <button className="px-4 py-2 bg-accent-purple text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap shadow-md">
                      Settings / Profile
                    </button>
                  </div>
                  <TodoForm onAddTodo={handleAddTodo} />
                  <TodoList
                    todos={todos}
                    onDeleteTodo={handleDeleteTodo}
                    onToggleComplete={handleToggleComplete}
                  />
                </>
            ) : ( // If user is NOT logged in and not loading, show a redirect message/button to login
                <div className="text-dark-text text-xl font-bold flex flex-col items-center">
                    <p className="mb-4 text-center">Please log in or register to view your tasks.</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-3 bg-accent-blue text-dark-bg font-bold rounded-md text-lg hover:bg-accent-purple transition-colors duration-200 shadow-lg"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="px-6 py-3 bg-accent-purple text-white font-bold rounded-md text-lg hover:bg-accent-blue transition-colors duration-200 shadow-lg"
                        >
                            Register
                        </button>
                    </div>
                </div>
            )
          } />

        </Routes>

      </div>
    </div>
  );
}

export default App;