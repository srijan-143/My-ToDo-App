// client/src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, onDelete, onToggleComplete, isHelloKittyTheme }) {
    const itemClasses = `flex justify-between items-center p-4 mb-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl
        ${isHelloKittyTheme ? 'bg-hk-white border border-hk-pink' : 'bg-gray-700 border border-gray-600'}
        ${todo.completed ? 'opacity-70 border-l-4 border-hk-red animate-pulse' : 'border-l-4 border-hk-red'}`;
    const textClasses = `flex-grow text-lg md:text-xl cursor-pointer ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}
        ${todo.completed ? 'line-through opacity-50' : ''}`;
    const statusIndicatorClasses = `text-xs md:text-sm font-semibold px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block border
        ${isHelloKittyTheme ? 'text-hk-red bg-hk-pink border-hk-pink' : 'text-yellow-400 bg-yellow-900 border-yellow-700'}`;
    const completedStatusIndicatorClasses = `text-xs md:text-sm font-semibold px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block border
        ${isHelloKittyTheme ? 'text-hk-white bg-hk-red border-hk-pink' : 'text-green-400 bg-green-900 border-green-700'}`;
    const toggleButtonClasses = `px-4 py-2 text-white rounded-md transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${isHelloKittyTheme ? 'bg-hk-red hover:bg-pink-700 focus:ring-hk-red' : 'bg-accent-purple hover:bg-purple-700 focus:ring-accent-purple'}`;
    const deleteButtonClasses = `px-4 py-2 text-white rounded-md transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${isHelloKittyTheme ? 'bg-hk-dark-primary hover:bg-gray-800 focus:ring-hk-red' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'}`;

    return (
        <li className={itemClasses}>
            <span onClick={() => onToggleComplete(todo._id || todo.id)} className={textClasses}>
                {todo.text}
            </span>
            <div className="flex items-center space-x-2 md:space-x-4 ml-4">
                {todo.completed ? (
                    <span className={completedStatusIndicatorClasses}>✓ Done</span>
                ) : (
                    <span className={statusIndicatorClasses}>Pending</span>
                )}
                <button onClick={() => onToggleComplete(todo._id || todo.id)} className={toggleButtonClasses}>
                    {todo.completed ? 'Mark Pending' : 'Mark Done'}
                </button>
                <button onClick={() => onDelete(todo._id || todo.id)} className={deleteButtonClasses}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;