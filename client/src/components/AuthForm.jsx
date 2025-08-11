// client/src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // NEW: Import Link

function AuthForm({ type, onSubmit, isHelloKittyTheme }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginIdentifier, setLoginIdentifier] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'register') {
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            onSubmit({ username, email, password });
        } else {
            onSubmit({ identifier: loginIdentifier, password });
        }
    };

    const formCardClasses = `p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-full sm:max-w-sm md:max-w-md mx-auto my-auto flex flex-col items-center
        ${isHelloKittyTheme ? 'bg-hk-light-pink border-hk-pink shadow-lg' : 'bg-dark-card border border-gray-700'}`;
    const inputClasses = `w-full p-3 sm:p-4 mb-3 sm:mb-4 border-2 rounded-md focus:outline-none transition-all duration-200 placeholder-gray-400 text-base sm:text-lg
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white text-hk-dark-primary focus:border-hk-red' : 'border-gray-600 bg-gray-800 text-dark-text focus:border-accent-blue'}`;
    const buttonClasses = `w-full px-4 sm:px-6 py-3 sm:py-4 font-bold rounded-md text-base sm:text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;
    const headingClasses = `text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`;
    const linkClasses = `mt-4 text-sm sm:text-base font-semibold transition-colors duration-200 text-center ${isHelloKittyTheme ? 'text-hk-dark-primary hover:text-hk-red' : 'text-accent-blue hover:text-accent-purple'}`;

    return (
        <form onSubmit={handleSubmit} className={formCardClasses}>
            <h2 className={headingClasses}>
                {type === 'login' ? 'Login' : 'Register'}
            </h2>

            {type === 'register' && (
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputClasses}
                    required
                />
            )}

            <input
                type={type === 'login' ? 'text' : 'email'}
                placeholder={type === 'login' ? 'Username or Email' : 'Email'}
                value={type === 'login' ? loginIdentifier : email}
                onChange={(e) => type === 'login' ? setLoginIdentifier(e.target.value) : setEmail(e.target.value)}
                className={inputClasses}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                required
            />

            {type === 'register' && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClasses}
                    required
                />
            )}

            <button type="submit" className={buttonClasses}>
                {type === 'login' ? 'Login' : 'Register'}
            </button>

            {/* NEW: Link to switch between forms */}
            {type === 'login' ? (
                <Link to="/register" className={linkClasses}>
                    Don't have an account? Register here.
                </Link>
            ) : (
                <Link to="/login" className={linkClasses}>
                    Already have an account? Login here.
                </Link>
            )}
        </form>
    );
}

export default AuthForm;