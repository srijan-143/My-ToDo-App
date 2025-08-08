// client/src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';

// ... (code) ...

function TodoList({ todos, onDeleteTodo, onToggleComplete, onEditTodo, isHelloKittyTheme }) {
    return (
        <div className="w-full max-w-lg mt-8">
                {todos.length === 0 ? (
                    <p className={`text-lg italic mt-8 text-center ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-dark-text-muted'}`}>No tasks yet! Add some above.</p>
                ) : (
                    <ul className="list-none p-0 m-0">
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
                )}
        </div>
    );
}


export default TodoList;