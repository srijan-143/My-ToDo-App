// client/src/components/TodoForm.jsx

import React, { useState } from 'react';
// Remove './TodoForm.css'; if you plan to only use Tailwind classes directly.
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
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-lg mb-8">
            <input
                type="text"
                placeholder="Add a new task..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className="flex-grow p-4 border-2 border-gray-600 bg-gray-700 text-dark-text rounded-l-lg text-lg focus:outline-none focus:border-accent-blue transition-all duration-300 shadow-lg placeholder-gray-400"
            />
            <button
                type="submit"
                className="px-7 py-4 bg-accent-blue text-dark-bg font-bold rounded-r-lg text-lg hover:bg-accent-purple transition-all duration-300 shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-opacity-50"
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;