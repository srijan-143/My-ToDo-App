// client/src/components/TodoForm.jsx

import React, { useState } from 'react';
// Remove './TodoForm.css'; if you prefer to only use Tailwind classes directly.
// If you keep the import, the file can be empty or contain only very specific custom CSS.

function TodoForm({ onAddTodo }) {
    const [todoText, setTodoText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        if (!todoText.trim()) return; // Don't add empty todos

        await onAddTodo(todoText); // Call the prop function to add the todo
        setTodoText(''); // Clear the input field after adding
    };

    return (
        // Use Tailwind classes for a modern form layout and styling
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-lg mb-6">
            <input
                type="text"
                placeholder="Add a new to-do..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="flex-grow p-3 border-2 border-gray-300 rounded-l-lg text-lg focus:outline-none focus:border-blue-500 transition-all duration-200 shadow-sm"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-r-lg text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-105"
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;