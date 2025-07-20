// client/src/App.jsx

import React, { useState } from 'react';
import './App.css';
import TodoForm from './components/todoForm';

import TodoList from './components/TodoList'; // Import TodoList

function App() {
  const [todos, setTodos] = useState([]); // State to hold our to-do items

  // Function to add a new todo (for now, just to frontend state)
  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Simple unique ID for frontend display
      text: text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    console.log("Added todo to frontend:", newTodo);
  };

  // Function to delete a todo (for now, just from frontend state)
  const handleDeleteTodo = (idToDelete) => {
    setTodos((prevTodos) => prevTodos.filter(todo => (todo._id || todo.id) !== idToDelete));
    console.log("Deleted todo from frontend with ID:", idToDelete);
  };

  // Function to toggle complete status (for now, just for frontend state)
  const handleToggleComplete = (idToToggle) => {
    setTodos((prevTodos) =>
      prevTodos.map(todo =>
        (todo._id || todo.id) === idToToggle ? { ...todo, completed: !todo.completed } : todo
      )
    );
    console.log("Toggled todo status for ID:", idToToggle);
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