// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AuthForm from './components/AuthForm';
import LandingPage from './components/LandingPage';
import ResetPassword from './components/ResetPassword';
import axios from 'axios';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const API_URL = 'http://localhost:5000/api/todos';
  // const AUTH_API_URL = 'http://localhost:5000/api/auth';

  const API_URL = 'https://my-todo-app-2-zmik.onrender.com/api/todos';
  const AUTH_API_URL = 'https://my-todo-app-2-zmik.onrender.com/api/auth';

  const navigate = useNavigate();

  // --- Auth Functions ---
  const handleAuthSubmit = async (formData, type) => {
    try {
      const url = type === 'login' ? `${AUTH_API_URL}/login` : `${AUTH_API_URL}/register`;
      const response = await axios.post(url, formData);
      const { token, ...userData } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/todos');
    } catch (error) {
      console.error(`Error during ${type}:`, error.response?.data?.message || error.message);
      alert(error.response?.data?.message || `Failed to ${type}. Please try again.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // --- Core Application Logic ---
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (e) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
      if (!token && !window.location.pathname.startsWith('/reset-password') && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        navigate('/');
    }
    };
    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!loading && user) {
        try {
          const token = localStorage.getItem('authToken');
          if (!token) {
            navigate('/');
            return;
          }
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.get(API_URL, config);
          setTodos(response.data);
        } catch (error) {
          console.error('Error fetching todos:', error.response?.data?.message || error.message);
          if (error.response && error.response.status === 401) { handleLogout(); }
        }
      } else {
        setTodos([]);
      }
    };
    if (!loading) {
      fetchTodos();
    }
  }, [user, loading, navigate]);

  const handleEditTodo = async (idToEdit, newText) => {
      try {
          const token = localStorage.getItem('authToken');
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.put(`${API_URL}/${idToEdit}`, { text: newText }, config);
          setTodos((prevTodos) =>
              prevTodos.map(todo =>
                  todo._id === idToEdit ? response.data : todo
              )
          );
          console.log("Edited todo on backend for ID:", idToEdit, response.data);
      } catch (error) {
          console.error('Error editing todo:', error.response?.data?.message || error.message);
          if (error.response && error.response.status === 401) { handleLogout(); }
      }
  };

  const handleAddTodo = async (text, priority) => { // NEW: Add priority parameter
      try {
          const token = localStorage.getItem('authToken');
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.post(API_URL, { text, priority }, config); // NEW: Send priority in the request body
          setTodos((prevTodos) => [...prevTodos, response.data]);
          console.log("Added todo to backend:", response.data);
      } catch (error) {
          console.error('Error adding todo:', error.response?.data?.message || error.message);
          if (error.response && error.response.status === 401) { handleLogout(); }
      }
  };

  const handleDeleteTodo = async (idToDelete) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${idToDelete}`, config);
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== idToDelete));
    } catch (error) {
      console.error('Error deleting todo:', error.response?.data?.message || error.message);
      if (error.response && error.response.status === 401) { handleLogout(); }
    }
  };

  const handleToggleComplete = async (idToToggle) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === idToToggle);
      if (!todoToUpdate) return;
      const updatedStatus = !todoToUpdate.completed;
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`${API_URL}/${idToToggle}`, { completed: updatedStatus }, config);
      setTodos((prevTodos) =>
        prevTodos.map(todo =>
          todo._id === idToToggle ? response.data : todo
        )
      );
    } catch (error) {
      console.error('Error toggling complete status:', error.response?.data?.message || error.message);
      if (error.response && error.response.status === 401) { handleLogout(); }
    }
  };

  const isHelloKittyTheme = user?.email === 'khushijain15082005@gmail.com';
  const appTitle = isHelloKittyTheme ? "Her Cute To-Do List!" : "Simple To-Do List";
  
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isHelloKittyTheme) {
        htmlElement.classList.add('hello-kitty-theme');
        htmlElement.classList.remove('dark');
    } else {
        htmlElement.classList.remove('hello-kitty-theme');
        htmlElement.classList.add('dark');
    }
  }, [isHelloKittyTheme]);
  
  const mainContainerClasses = `flex flex-col items-center justify-center p-2 sm:p-4 w-full min-h-screen`;

// client/src/App.jsx
const appCardClasses = `p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl transform transition-transform duration-200 relative flex flex-col items-center mx-2 sm:mx-auto
    ${isHelloKittyTheme ? 'bg-hk-light-pink border-hk-pink shadow-lg' : 'bg-dark-card border border-gray-700'}`;
const headingClasses = `text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 tracking-tight text-center ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`;


  const logoutButtonClasses = `absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-2 text-white rounded-md text-sm sm:text-base transition-colors duration-200 shadow-md z-10 ${isHelloKittyTheme ? 'bg-hk-red hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'}`;
  const loginRegisterWrapperClasses = `text-lg sm:text-xl font-bold flex flex-col items-center ${isHelloKittyTheme ? 'text-hk-red' : 'text-dark-text'}`;
  const loginButtonClasses = `px-4 py-2 sm:px-6 sm:py-3 font-bold rounded-md text-base sm:text-lg shadow-lg ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple'}`;
  const registerButtonClasses = `px-4 py-2 sm:px-6 sm:py-3 font-bold rounded-md text-base sm:text-lg shadow-lg ${isHelloKittyTheme ? 'bg-hk-pink text-hk-white hover:bg-hk-red' : 'bg-accent-purple text-white hover:bg-accent-blue'}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg text-dark-text text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className={mainContainerClasses}>
      <div className={appCardClasses}>
        {user && (
            <button onClick={handleLogout} className={logoutButtonClasses}>
                Logout
            </button>
        )}

        <Routes>
          <Route path="/" element={user ? <Navigate to="/todos" /> : <LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/todos" /> : <AuthForm isHelloKittyTheme={isHelloKittyTheme} type="login" onSubmit={(formData) => handleAuthSubmit(formData, 'login')} />} />
          <Route path="/register" element={user ? <Navigate to="/todos" /> : <AuthForm isHelloKittyTheme={isHelloKittyTheme} type="register" onSubmit={(formData) => handleAuthSubmit(formData, 'register')} />} />
          <Route path="/reset-password/:token" element={<ResetPassword isHelloKittyTheme={isHelloKittyTheme} />} />
          <Route path="/todos" element={
            user ? (
                    // This container centers content properly with top padding for logout button
                    <div className={`flex flex-col items-center w-full pt-12 sm:pt-8 ${todos.length === 0 ? 'justify-center min-h-[300px] sm:min-h-[400px]' : ''}`}>
                        <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 tracking-tight text-center px-4 ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`}>{appTitle}</h1>
                        <TodoForm onAddTodo={handleAddTodo} isHelloKittyTheme={isHelloKittyTheme} />
                        <TodoList
                            isHelloKittyTheme={isHelloKittyTheme}
                            todos={todos}
                            onDeleteTodo={handleDeleteTodo}
                            onToggleComplete={handleToggleComplete}
                            onEditTodo={handleEditTodo}
                        />
                    </div>
                ) : (
                    <Navigate to="/" />
                )
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;