// client/src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem'; // Import the individual TodoItem component
import './TodoList.css'; // We'll create this CSS file next

function TodoList({ todos, onDeleteTodo, onToggleComplete }) {
    return (
        <div className="todo-list-container">
            {todos.length === 0 ? (
                <p className="no-todos-message">No to-dos yet! Add some above.</p>
            ) : (
                <ul className="todo-list">
                    {todos.map(todo => (
                        <TodoItem
                            key={todo._id || todo.id} // Use _id from backend, fallback to id for local
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