// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/todoForm';
import TodoList from './components/TodoList';
import axios from 'axios'; // Import axios
//import React, { useState } from 'react';
//import './App.css';
//import TodoForm from './components/todoForm';

//import TodoList from './components/TodoList'; // Import TodoList

function App() {
  const [todos, setTodos] = useState([]);

  // Base URL for your backend API (ensure this matches your backend's port)
  const API_URL = 'http://localhost:5000/api/todos';

  // useEffect to fetch todos from the backend when the component first loads
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(API_URL);
        setTodos(response.data); // Update state with todos received from the backend
      } catch (error) {
        console.error('Error fetching todos:', error);
        // Handle error, e.g., display a message to the user
      }
    };
    fetchTodos();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Function to add a new todo - now connects to backend
  const handleAddTodo = async (text) => {
    try {
      // Send a POST request to your backend with the new todo text
      const response = await axios.post(API_URL, { text });
      setTodos((prevTodos) => [...prevTodos, response.data]); // Add the new todo received from the backend response
      console.log("Added todo to backend:", response.data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to delete a todo - now connects to backend
  const handleDeleteTodo = async (idToDelete) => {
    try {
      // Send a DELETE request to your backend for the specific todo ID
      await axios.delete(`${API_URL}/${idToDelete}`);
      // Update frontend state by filtering out the deleted todo using its MongoDB _id
      setTodos((prevTodos) => prevTodos.filter(todo => todo._id !== idToDelete));
      console.log("Deleted todo from backend with ID:", idToDelete);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Function to toggle complete status - now connects to backend
  const handleToggleComplete = async (idToToggle) => {
    try {
      // Find the todo in the current state to determine its current completion status
      const todoToUpdate = todos.find(todo => todo._id === idToToggle);
      if (!todoToUpdate) return; // If todo is not found, do nothing

      // Determine the new completion status
      const updatedStatus = !todoToUpdate.completed;

      // Send a PUT request to update the todo on the backend
      const response = await axios.put(`${API_URL}/${idToToggle}`, { completed: updatedStatus });

      // Update the frontend state with the updated todo received from the backend
      setTodos((prevTodos) =>
        prevTodos.map(todo =>
          todo._id === idToToggle ? response.data : todo // Replace the old todo with the updated data
        )
      );
      console.log("Toggled todo status on backend for ID:", idToToggle, response.data);
    } catch (error) {
      console.error('Error toggling complete status:', error);
    }
  };

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;