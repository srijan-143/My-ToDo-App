// client/src/components/TodoItem.jsx

import React from 'react';
// Remove './TodoItem.css'; if you prefer to only use Tailwind classes directly.
// If you keep the import, the file can be empty or contain only very specific custom CSS.

function TodoItem({ todo, onDelete, onToggleComplete }) {
    return (
        // Use Tailwind classes for item styling, conditional classes for 'completed' state
        <li className={`flex justify-between items-center p-4 mb-3 bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${todo.completed ? 'opacity-70 border-l-4 border-green-500' : 'border-l-4 border-transparent'}`}>
            <span
                onClick={() => onToggleComplete(todo._id || todo.id)}
                className={`flex-grow text-lg md:text-xl cursor-pointer text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
                {todo.text}
            </span>
            <div className="flex items-center space-x-2 md:space-x-4 ml-4">
                {/* Status Indicator (optional, but good for visual clarity) */}
                {todo.completed ? (
                    <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap hidden sm:inline">Done</span>
                ) : (
                    <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full whitespace-nowrap hidden sm:inline">Pending</span>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => onToggleComplete(todo._id || todo.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105"
                >
                    {todo.completed ? 'Mark Pending' : 'Mark Done'}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(todo._id || todo.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;