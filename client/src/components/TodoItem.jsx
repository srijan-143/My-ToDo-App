// client/src/components/TodoItem.jsx

import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggleComplete, onEdit, isHelloKittyTheme }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleSave = () => {
        if (editedText.trim() === '') return;
        onEdit(todo._id, editedText);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedText(todo.text);
    };

    // Corrected responsive classes for the list item container
    const itemClasses = `flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl space-y-3 sm:space-y-0 ${todo.completed ? 'opacity-70 border-l-4 border-green-600' : 'border-l-4'} ${isHelloKittyTheme ? 'bg-hk-white border-hk-red' : 'bg-dark-card border-accent-blue'}`;

    // Common classes for all buttons
    const buttonClasses = `px-3 py-2 text-white rounded-md transition-all duration-200 text-xs sm:text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 min-w-[60px] sm:min-w-[70px]`;

    // Classes for the text content
    const textClasses = `flex-grow text-base sm:text-lg md:text-xl cursor-pointer pr-2 sm:pr-4 ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'} ${todo.completed ? 'line-through opacity-50' : ''} break-words`;
    
    // Classes for the input field
    const inputClasses = `flex-grow p-2 border-2 rounded-md text-base sm:text-lg focus:outline-none focus:border-accent-blue transition-all duration-200 ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white text-hk-dark-primary' : 'border-gray-600 bg-gray-700 text-dark-text'}`;

    return (
        <li className={itemClasses}>
            <div className="flex-grow w-full sm:w-auto">
                {isEditing ? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={inputClasses}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSave();
                            if (e.key === 'Escape') setIsEditing(false);
                        }}
                        autoFocus
                    />
                ) : (
                    <div className="flex items-start space-x-2">
                        <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 px-2 py-1 rounded-full whitespace-nowrap">
                            {todo.priority === 'High' ? '🔥' : todo.priority === 'Medium' ? '⚡' : '🌱'} {todo.priority}
                        </span>
                        <span
                            onClick={() => onToggleComplete(todo._id || todo.id)}
                            className={textClasses}
                        >
                            {todo.text}
                        </span>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center space-y-2 xs:space-y-0 xs:space-x-2 w-full sm:w-auto sm:ml-4">
                <div className="flex space-x-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className={`bg-green-600 hover:bg-green-700 focus:ring-green-500 ${buttonClasses} flex-1 xs:flex-none`}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className={`bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 ${buttonClasses} flex-1 xs:flex-none`}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditClick}
                                className={`bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 ${buttonClasses} flex-1 xs:flex-none`}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onToggleComplete(todo._id || todo.id)}
                                className={`${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500' : 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-500'} ${buttonClasses} flex-1 xs:flex-none`}
                            >
                                {todo.completed ? '↩️' : '✓'}
                            </button>
                        </>
                    )}
                </div>
                
                <button
                    onClick={() => onDelete(todo._id || todo.id)}
                    className={`bg-red-600 hover:bg-red-700 focus:ring-red-500 ${buttonClasses} w-full xs:w-auto`}
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
