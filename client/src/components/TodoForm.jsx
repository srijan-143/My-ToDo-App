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

    const buttonClasses = `px-4 sm:px-6 lg:px-7 py-3 sm:py-4 font-bold rounded-r-lg text-base sm:text-lg shadow-xl transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;
    const inputContainerClasses = `relative flex-grow flex items-center border-2 rounded-l-lg shadow-lg min-h-[48px] sm:min-h-[56px]
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white' : 'border-gray-600 bg-gray-700'}`;
    const inputClasses = `flex-grow p-3 sm:p-4 bg-transparent text-base sm:text-lg focus:outline-none placeholder-gray-400 min-h-[44px]
        ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}`;
    const selectClasses = `p-3 sm:p-4 text-base sm:text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 appearance-none cursor-pointer`;
    const arrowClasses = `absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 pointer-events-none
        ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}`;
    const optionClasses = `bg-dark-card text-dark-text ${isHelloKittyTheme ? 'bg-hk-light-pink text-hk-dark-primary' : ''}`;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mb-6 sm:mb-8 space-y-3 sm:space-y-0">
            {/* Priority dropdown - shows on top on mobile */}
            <div className="sm:hidden w-full">
                <div className={`relative flex items-center border-2 rounded-lg shadow-lg min-h-[48px]
                    ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white' : 'border-gray-600 bg-gray-700'}`}>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className={`w-full ${selectClasses} ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text'}`}
                    >
                        <option value="High" className={optionClasses}>🔥 High Priority</option>
                        <option value="Medium" className={optionClasses}>⚡ Medium Priority</option>
                        <option value="Low" className={optionClasses}>🌱 Low Priority</option>
                    </select>
                    <div className={arrowClasses}>▼</div>
                </div>
            </div>
            
            {/* Input and button container */}
            <div className="flex w-full">
                <div className={inputContainerClasses}>
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                        className={inputClasses}
                    />
                    
                    {/* Priority dropdown - shows inline on larger screens */}
                    <div className="hidden sm:block relative">
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className={`${selectClasses} pr-8 border-l border-gray-500 ${isHelloKittyTheme ? 'text-hk-dark-primary border-hk-pink' : 'text-dark-text'}`}
                        >
                            <option value="High" className={optionClasses}>🔥 High</option>
                            <option value="Medium" className={optionClasses}>⚡ Medium</option>
                            <option value="Low" className={optionClasses}>🌱 Low</option>
                        </select>
                        <div className={arrowClasses}>▼</div>
                    </div>
                </div>
                <button
                    type="submit"
                    className={buttonClasses}
                >
                    Add
                </button>
            </div>
        </form>
    );
}

export default TodoForm;