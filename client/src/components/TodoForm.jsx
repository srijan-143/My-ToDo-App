// client/src/components/TodoForm.jsx
import React, { useState } from 'react';

function TodoForm({ onAddTodo, isHelloKittyTheme }) {
    const [todoText, setTodoText] = useState('');
    const [priority, setPriority] = useState('Medium');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!todoText.trim()) return;
        await onAddTodo(todoText, priority);
        setTodoText('');
        setPriority('Medium');
    };

    const buttonClasses = `px-7 py-4 font-bold rounded-r-lg text-lg shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;
    const inputContainerClasses = `relative flex-grow flex items-center border-2 rounded-l-lg shadow-lg
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white' : 'border-gray-600 bg-gray-700'}`;
    const inputClasses = `flex-grow p-4 bg-transparent text-lg focus:outline-none placeholder-gray-400
        ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}`;
    const selectClasses = `p-4 text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 appearance-none`;
    const arrowClasses = `absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4
        ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}`;
    const optionClasses = `bg-dark-card text-dark-text ${isHelloKittyTheme ? 'bg-hk-light-pink text-hk-dark-primary' : ''}`;

    return (
        <form onSubmit={handleSubmit} className="flex items-stretch w-full max-w-lg mb-8 relative group">
            <div className={inputContainerClasses}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                    className={inputClasses}
                />
                <div className="relative flex items-center pr-4">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={selectClasses}
                    >
                        <option className={optionClasses} value="Low">Low</option>
                        <option className={optionClasses} value="Medium">Medium</option>
                        <option className={optionClasses} value="High">High</option>
                    </select>
                    <svg className={arrowClasses} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
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