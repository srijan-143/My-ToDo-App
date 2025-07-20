// client/src/components/TodoForm.jsx
import React, { useState } from 'react';
import './TodoForm.css'; // We'll create this CSS file next

function TodoForm({ onAddTodo }) { // onAddTodo will be a prop from App.jsx
    const [todoText, setTodoText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        if (!todoText.trim()) return; // Don't add empty todos

        await onAddTodo(todoText); // Call the prop function to add the todo
        setTodoText(''); // Clear the input field after adding
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Add a new to-do..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="todo-input"
            />
            <button type="submit" className="todo-button">Add To-Do</button>
        </form>
    );
}

export default TodoForm;