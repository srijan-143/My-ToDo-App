// client/src/components/TodoItem.jsx

import React from 'react';
// Ensure './TodoItem.css' import is removed if the file is empty

function TodoItem({ todo, onDelete, onToggleComplete }) {
    return (
        <li className={`flex justify-between items-center p-4 mb-4 bg-gray-700 border border-gray-600 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl ${todo.completed ? 'opacity-70 border-l-4 border-green-500' : 'border-l-4 border-accent-blue animate-fade-in'}`}>
            <span
                onClick={() => onToggleComplete(todo._id || todo.id)}
                className={`flex-grow text-lg md:text-xl cursor-pointer text-dark-text ${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
                {todo.text}
            </span>
            <div className="flex items-center space-x-2 md:space-x-4 ml-4">
                {/* Status Indicator */}
                {todo.completed ? (
                    <span className="text-xs md:text-sm font-semibold text-green-400 bg-green-900 px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block border border-green-700">✓ Done</span>
                ) : (
                    <span className="text-xs md:text-sm font-semibold text-yellow-400 bg-yellow-900 px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block border border-yellow-700">Pending</span>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => onToggleComplete(todo._id || todo.id)}
                    className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-purple-700 transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-opacity-50"
                >
                    {todo.completed ? 'Mark Pending' : 'Mark Done'}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(todo._id || todo.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;