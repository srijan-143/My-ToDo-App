// client/src/components/TodoItem.jsx

import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggleComplete, onEdit, isHelloKittyTheme }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleSave = () => {
        if (editedText.trim() === '') return;
        onEdit(todo._id, editedText); // Call the onEdit function from App.jsx
        setIsEditing(false); // Exit edit mode
    };

    const handleEditClick = () => {
        setIsEditing(true); // Enter edit mode
        setEditedText(todo.text); // Set the editedText to the current todo text
    };

    const itemClasses = `flex justify-between items-center p-4 mb-4 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-2xl
        ${isHelloKittyTheme ? 'bg-hk-white border border-hk-pink' : 'bg-gray-700 border border-gray-600'}
        ${todo.completed ? 'opacity-70 border-l-4 border-green-600' : 'border-l-4 border-hk-red'}`;
    const textClasses = `flex-grow text-lg md:text-xl cursor-pointer ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}
        ${todo.completed ? 'line-through opacity-50' : ''}`;
    const inputClasses = `flex-grow p-2 border-2 rounded-md text-lg focus:outline-none focus:border-accent-blue transition-all duration-200`;
    const buttonClasses = `px-4 py-2 text-white rounded-md transition-colors duration-200 text-sm font-semibold whitespace-nowrap transform hover:scale-105 active:scale-95 shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50`;

    return (
        <li className={itemClasses}>
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
                />
            ) : (
                <span
                    onClick={() => onToggleComplete(todo._id || todo.id)}
                    className={textClasses}
                >
                    {todo.text}
                </span>
            )}
            <div className="flex items-center space-x-2 md:space-x-4 ml-4">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className={`bg-green-600 hover:bg-green-700 ${buttonClasses}`}
                    >
                        Save
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleEditClick}
                            className={`bg-blue-500 hover:bg-blue-600 ${buttonClasses}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onToggleComplete(todo._id || todo.id)}
                            className={`bg-purple-500 hover:bg-purple-600 ${buttonClasses}`}
                        >
                            {todo.completed ? 'Mark Pending' : 'Mark Done'}
                        </button>
                    </>
                )}
                <button
                    onClick={() => onDelete(todo._id || todo.id)}
                    className={`bg-red-600 hover:bg-red-700 ${buttonClasses}`}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;