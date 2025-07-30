// client/src/components/TodoList.jsx

import React from 'react';
import TodoItem from './TodoItem';
// Ensure './TodoList.css' import is removed if the file is empty

function TodoList({ todos, onDeleteTodo, onToggleComplete }) {
    return (
        <div className="w-full max-w-lg mt-8"> {/* Container for the list */}
            {todos.length === 0 ? (
                <p className="text-dark-text-muted text-lg italic mt-8 text-center">No tasks yet! Add some above.</p>
            ) : (
                <ul className="list-none p-0 m-0"> {/* Styled as a simple list */}
                    {todos.map(todo => (
                        <TodoItem
                            key={todo._id || todo.id}
                            todo={todo}
                            onDelete={onDeleteTodo}
                            onToggleComplete={onToggleComplete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TodoList;