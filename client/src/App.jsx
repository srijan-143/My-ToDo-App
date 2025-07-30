// client/src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css'; // Keep this import if you have unique styles here.
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const API_URL = 'http://localhost:5000/api/todos'; // Use your local backend URL for local development

  // useEffect to fetch todos from the backend when the component first loads
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []); // Empty dependency array means this effect runs only once on mount

  // Function to add a new todo - now connects to backend
  const handleAddTodo = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      console.log("Added todo to backend:", response.data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to delete a todo - now connects to backend
  const handleDeleteTodo = async (idToDelete) => {
    try {
      await axios.delete(`${API_URL}/${idToDelete}`);
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== idToDelete));
      console.log("Deleted todo from backend with ID:", idToDelete);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Function to toggle complete status - now connects to backend
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
      console.log("Toggled todo status on backend for ID:", idToToggle, response.data);
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  return (
    // Main wrapper for the entire application
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">

      {/* Application Card/Container - updated background for dark aesthetic */}
      <div className="bg-dark-card p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform hover:scale-[1.005] transition-transform duration-200 border border-gray-700">

        <h1 className="text-4xl md:text-5xl font-extrabold text-accent-blue mb-6 tracking-tight text-center">
          My Pro To-Do List
        </h1>

        {/* Placeholder area for future features */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 py-2 border-b border-gray-700 gap-4">
          <p className="text-dark-text-muted text-sm md:text-base italic flex-grow text-center sm:text-left">
            Future smart features go here: Filters, Search, etc.
          </p>
          <button className="px-4 py-2 bg-accent-purple text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 whitespace-nowrap shadow-md">
            Settings / Profile
          </button>
        </div>

        {/* To-Do Input Form */}
        <TodoForm onAddTodo={handleAddTodo} /> {/* handleAddTodo is passed as a prop */}

        {/* To-Do List Display */}
        <TodoList
          todos={todos}
          onDeleteTodo={handleDeleteTodo}
          onToggleComplete={handleToggleComplete}
        />

      </div> {/* End of Application Card/Container */}

    </div> // End of main wrapper div
  );
}

export default App;