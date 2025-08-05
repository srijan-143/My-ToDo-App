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
  const [loading, setLoading] = useState(true);
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
      navigate('/');
    } catch (error) {
      console.error(`Error during ${type}:`, error.response?.data?.message || error.message);
      alert(error.response?.data?.message || `Failed to ${type}. Please try again.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
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
      if (!token && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
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
            navigate('/login');
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

  const handleAddTodo = async (text) => {
    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(API_URL, { text }, config);
      setTodos((prevTodos) => [...prevTodos, response.data]);
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

  const mainContainerClasses = `flex flex-col items-center justify-center p-4 w-full h-full`;
  const appCardClasses = `p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform transition-transform duration-200 relative
  flex flex-col items-center   /* THIS IS THE CHANGE: ensures children are centered horizontally */
  ${isHelloKittyTheme ? 'bg-hk-light-pink border-hk-pink shadow-lg' : 'bg-dark-card border border-gray-700'}`;

  const headingClasses = `text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-center ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`;
  const logoutButtonClasses = `absolute top-4 right-4 px-3 py-1 text-white rounded-md text-sm transition-colors duration-200 shadow-md ${isHelloKittyTheme ? 'bg-hk-red hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'}`;
  const loginRegisterWrapperClasses = `text-xl font-bold flex flex-col items-center ${isHelloKittyTheme ? 'text-hk-red' : 'text-dark-text'}`;
  const loginButtonClasses = `px-6 py-3 font-bold rounded-md text-lg shadow-lg ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple'}`;
  const registerButtonClasses = `px-6 py-3 font-bold rounded-md text-lg shadow-lg ${isHelloKittyTheme ? 'bg-hk-pink text-hk-white hover:bg-hk-red' : 'bg-accent-purple text-white hover:bg-accent-blue'}`;

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
          <Route path="/login" element={<AuthForm isHelloKittyTheme={isHelloKittyTheme} type="login" onSubmit={(formData) => handleAuthSubmit(formData, 'login')} />} />
          <Route path="/register" element={<AuthForm isHelloKittyTheme={isHelloKittyTheme} type="register" onSubmit={(formData) => handleAuthSubmit(formData, 'register')} />} />
          <Route path="/" element={
            user ? (
                <>
                  <h1 className={headingClasses}>{appTitle}</h1>
                  <TodoForm onAddTodo={handleAddTodo} isHelloKittyTheme={isHelloKittyTheme} />
                  <TodoList
                    isHelloKittyTheme={isHelloKittyTheme}
                    todos={todos}
                    onDeleteTodo={handleDeleteTodo}
                    onToggleComplete={handleToggleComplete}
                  />
                </>
            ) : (
                <div className={loginRegisterWrapperClasses}>
                    <p className="mb-4 text-center">Please log in or register to view your tasks.</p>
                    <div className="flex space-x-4">
                        <button onClick={() => navigate('/login')} className={loginButtonClasses}>
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className={registerButtonClasses}>
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