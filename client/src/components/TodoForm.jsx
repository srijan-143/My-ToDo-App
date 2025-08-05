// client/src/components/TodoForm.jsx
import React, { useState } from 'react';

function TodoForm({ onAddTodo, isHelloKittyTheme }) {
    const [todoText, setTodoText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!todoText.trim()) return;
        await onAddTodo(todoText);
        setTodoText('');
    };

    const inputClasses = `flex-grow p-4 border-2 rounded-l-lg text-lg focus:outline-none transition-all duration-200 shadow-lg placeholder-gray-400
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white text-hk-dark-primary focus:border-hk-red' : 'border-gray-600 bg-gray-700 text-dark-text focus:border-accent-blue'}`;
    const buttonClasses = `px-7 py-4 font-bold rounded-r-lg text-lg shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-lg mb-8 relative group">
            <input
                type="text"
                placeholder="Add a new task..."
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                className={inputClasses}
            />
            <button
                type="submit"
                className={buttonClasses}
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;