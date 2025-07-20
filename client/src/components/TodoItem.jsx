// client/src/components/TodoItem.jsx
import React from 'react';
import './TodoItem.css'; // We'll create this CSS file next

function TodoItem({ todo, onDelete, onToggleComplete }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => onToggleComplete(todo._id || todo.id)} className="todo-text">
                {todo.text}
            </span>
            <div className="todo-actions">
                {/* Optional: Add a visual indicator for completion */}
                {todo.completed ? (
                    <span className="status-indicator completed-text">✓ Done</span>
                ) : (
                    <span className="status-indicator pending-text">Pending</span>
                )}
                <button onClick={() => onToggleComplete(todo._id || todo.id)} className="toggle-button">
                    {todo.completed ? 'Mark Pending' : 'Mark Done'}
                </button>
                <button onClick={() => onDelete(todo._id || todo.id)} className="delete-button">
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;