// client/src/components/AuthForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AuthForm({ type, onSubmit, isHelloKittyTheme }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginIdentifier, setLoginIdentifier] = useState('');
    
    // Forgot functionality states
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showForgotUsername, setShowForgotUsername] = useState(false);
    const [forgotUsername, setForgotUsername] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotResult, setForgotResult] = useState(null);

    // API URLs - matching your App.jsx
    const AUTH_API_URL = 'http://localhost:5000/api/auth';

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

    // Forgot Password Handler - NEW: Email-based reset
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${AUTH_API_URL}/forgot-password`, {
                email: forgotEmail
            });
            setForgotResult({
                type: 'password',
                success: true,
                data: response.data.message,
                message: 'Password reset email sent!'
            });
        } catch (error) {
            setForgotResult({
                type: 'password',
                success: false,
                message: error.response?.data?.message || 'Error sending reset email'
            });
        }
    };

    // Forgot Username Handler
    const handleForgotUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${AUTH_API_URL}/forgot-username`, {
                email: forgotEmail
            });
            setForgotResult({
                type: 'username',
                success: true,
                data: response.data.username,
                message: 'Username found!'
            });
        } catch (error) {
            setForgotResult({
                type: 'username',
                success: false,
                message: error.response?.data?.message || 'Error finding username'
            });
        }
    };

    // Reset forgot form
    const resetForgotForm = () => {
        setShowForgotPassword(false);
        setShowForgotUsername(false);
        setForgotUsername('');
        setForgotEmail('');
        setForgotResult(null);
    };

    const formCardClasses = `p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-full sm:max-w-sm md:max-w-md mx-auto my-auto flex flex-col items-center
        ${isHelloKittyTheme ? 'bg-hk-light-pink border-hk-pink shadow-lg' : 'bg-dark-card border border-gray-700'}`;
    const inputClasses = `w-full p-3 sm:p-4 mb-3 sm:mb-4 border-2 rounded-md focus:outline-none transition-all duration-200 placeholder-gray-400 text-base sm:text-lg
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white text-hk-dark-primary focus:border-hk-red' : 'border-gray-600 bg-gray-800 text-dark-text focus:border-accent-blue'}`;
    const buttonClasses = `w-full px-4 sm:px-6 py-3 sm:py-4 font-bold rounded-md text-base sm:text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;
    const headingClasses = `text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 sm:mb-6 ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`;
    const linkClasses = `mt-4 text-sm sm:text-base font-semibold transition-colors duration-200 text-center ${isHelloKittyTheme ? 'text-hk-dark-primary hover:text-hk-red' : 'text-accent-blue hover:text-accent-purple'}`;
    
    // Forgot functionality classes
    const forgotLinkClasses = `text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200 hover:underline ${isHelloKittyTheme ? 'text-hk-dark-primary hover:text-hk-red' : 'text-accent-blue hover:text-accent-purple'}`;
    const forgotContainerClasses = `mt-4 p-4 rounded-lg border ${isHelloKittyTheme ? 'bg-hk-white border-hk-pink' : 'bg-gray-800 border-gray-600'}`;
    const resultClasses = `mt-3 p-3 rounded-md text-sm ${forgotResult?.success ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`;

    return (
        <div className="flex flex-col items-center w-full">
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

                {/* Link to switch between forms */}
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

            {/* Forgot Password/Username Section - Only show on login page */}
            {type === 'login' && (
                <div className="w-full max-w-full sm:max-w-sm md:max-w-md mx-auto mt-6">
                    <div className="flex justify-center space-x-4 mb-4">
                        <button
                            type="button"
                            onClick={() => {
                                resetForgotForm();
                                setShowForgotPassword(true);
                            }}
                            className={forgotLinkClasses}
                        >
                            Forgot Password?
                        </button>
                        <span className={`text-xs sm:text-sm ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-gray-400'}`}>|</span>
                        <button
                            type="button"
                            onClick={() => {
                                resetForgotForm();
                                setShowForgotUsername(true);
                            }}
                            className={forgotLinkClasses}
                        >
                            Forgot Username?
                        </button>
                    </div>

                    {/* Forgot Password Form - NEW: Email-only */}
                    {showForgotPassword && (
                        <div className={forgotContainerClasses}>
                            <h3 className={`text-lg font-bold mb-3 ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`}>
                                Reset Password
                            </h3>
                            <p className={`text-sm mb-4 ${isHelloKittyTheme ? 'text-hk-dark-primary' : 'text-gray-300'}`}>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <form onSubmit={handleForgotPassword}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className={inputClasses}
                                    required
                                />
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className={`flex-1 px-4 py-2 font-bold rounded-md text-sm shadow-md transition-all duration-200 ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple'}`}
                                    >
                                        Send Reset Link
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForgotForm}
                                        className={`px-4 py-2 font-bold rounded-md text-sm shadow-md transition-all duration-200 ${isHelloKittyTheme ? 'bg-gray-400 text-white hover:bg-gray-500' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Forgot Username Form */}
                    {showForgotUsername && (
                        <div className={forgotContainerClasses}>
                            <h3 className={`text-lg font-bold mb-3 ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`}>
                                Recover Username
                            </h3>
                            <form onSubmit={handleForgotUsername}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className={inputClasses}
                                    required
                                />
                                <div className="flex space-x-2">
                                    <button
                                        type="submit"
                                        className={`flex-1 px-4 py-2 font-bold rounded-md text-sm shadow-md transition-all duration-200 ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple'}`}
                                    >
                                        Get Username
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForgotForm}
                                        className={`px-4 py-2 font-bold rounded-md text-sm shadow-md transition-all duration-200 ${isHelloKittyTheme ? 'bg-gray-400 text-white hover:bg-gray-500' : 'bg-gray-600 text-white hover:bg-gray-700'}`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Result Display */}
                    {forgotResult && (
                        <div className={resultClasses}>
                            <p className="font-semibold">{forgotResult.message}</p>
                            {forgotResult.success && forgotResult.data && (
                                <p className="mt-2">
                                    {forgotResult.type === 'username' ? (
                                        <>
                                            <strong>Your Username: </strong>
                                            <span className="font-mono bg-white px-2 py-1 rounded border text-black">
                                                {forgotResult.data}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm">
                                            {forgotResult.data}
                                        </span>
                                    )}
                                </p>
                            )}
                            <button
                                onClick={() => setForgotResult(null)}
                                className="mt-3 text-xs underline hover:no-underline"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AuthForm;