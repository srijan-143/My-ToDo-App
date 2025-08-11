// client/src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

// ... (code) ...

function TodoList({ todos, onDeleteTodo, onToggleComplete, onEditTodo, isHelloKittyTheme }) {
    return (
        <div className="w-full max-w-full mt-4 sm:mt-6 md:mt-8 px-4">
            {todos.length === 0 ? (
                <div className="text-center py-8">
                    <p className={`text-base sm:text-lg italic ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text-muted'}`}>
                        No tasks yet! Add some above.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        🌟 Stay organized and productive!
                    </p>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-center">
                        <p className={`text-sm ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text-muted'}`}>
                            {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
                        </p>
                    </div>
                    <ul className="list-none p-0 m-0 space-y-2 sm:space-y-3">
                        {todos.map(todo => (
                            <TodoItem
                                key={todo._id || todo.id}
                                todo={todo}
                                onDelete={onDeleteTodo}
                                onToggleComplete={onToggleComplete}
                                onEdit={onEditTodo}
                                isHelloKittyTheme={isHelloKittyTheme}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}


export default TodoList;