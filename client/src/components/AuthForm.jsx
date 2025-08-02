// client/src/components/AuthForm.jsx

import React, { useState } from 'react';

function AuthForm({ type, onSubmit }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginIdentifier, setLoginIdentifier] = useState(''); // NEW state for login input

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'register') {
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            onSubmit({ username, email, password }); // For registration, send all fields
        } else { // type === 'login'
            onSubmit({ identifier: loginIdentifier, password }); // For login, send identifier and password
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-dark-card p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col items-center border border-gray-700">
            <h2 className="text-3xl font-extrabold text-accent-blue mb-6">
                {type === 'login' ? 'Login' : 'Register'}
            </h2>

            {type === 'register' && (
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 mb-4 border-2 border-gray-600 bg-gray-800 text-dark-text rounded-md focus:outline-none focus:border-accent-blue transition-all duration-200 placeholder-gray-400"
                    required
                />
            )}

            {/* Modified input for login, or email for register */}
            <input
                type={type === 'login' ? 'text' : 'email'} // Type can be text for login to allow username
                placeholder={type === 'login' ? 'Username or Email' : 'Email'}
                value={type === 'login' ? loginIdentifier : email}
                onChange={(e) => type === 'login' ? setLoginIdentifier(e.target.value) : setEmail(e.target.value)}
                className="w-full p-3 mb-4 border-2 border-gray-600 bg-gray-800 text-dark-text rounded-md focus:outline-none focus:border-accent-blue transition-all duration-200 placeholder-gray-400"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border-2 border-gray-600 bg-gray-800 text-dark-text rounded-md focus:outline-none focus:border-accent-blue transition-all duration-200 placeholder-gray-400"
                required
            />

            {type === 'register' && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 mb-6 border-2 border-gray-600 bg-gray-800 text-dark-text rounded-md focus:outline-none focus:border-accent-blue transition-all duration-200 placeholder-gray-400"
                    required
                />
            )}

            <button
                type="submit"
                className="w-full px-6 py-3 bg-accent-blue text-dark-bg font-bold rounded-md text-lg hover:bg-accent-purple transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-opacity-50"
            >
                {type === 'login' ? 'Login' : 'Register'}
            </button>
        </form>
    );
}

export default AuthForm;