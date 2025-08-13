// client/src/c    const AUTH_API_URL = 'https://my-todo-app-2-zmik.onrender.com/api/auth';mponents/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword({ isHelloKittyTheme }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    const { token } = useParams();
    const navigate = useNavigate();
    
    // const AUTH_API_URL = 'http://localhost:5000/api/auth';
    
    const AUTH_API_URL = 'https://my-todo-app-2-zmik.onrender.com/api/auth';

    useEffect(() => {
        if (!token) {
            setError('Invalid reset token');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        // Validate passwords
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${AUTH_API_URL}/reset-password/${token}`, {
                password
            });

            if (response.data.success) {
                setMessage('Password reset successful! Redirecting to login...');
                
                // Optionally auto-login the user
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email
                }));
                
                // Redirect after a short delay
                setTimeout(() => {
                    navigate('/todos');
                }, 2000);
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setError(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    // Theme-based classes
    const containerClasses = `flex flex-col items-center justify-center min-h-screen p-4 ${isHelloKittyTheme ? 'bg-hk-bg' : 'bg-dark-bg'}`;
    
    const formCardClasses = `p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto
        ${isHelloKittyTheme ? 'bg-hk-light-pink border-hk-pink shadow-lg' : 'bg-dark-card border border-gray-700'}`;
        
    const headingClasses = `text-2xl sm:text-3xl font-extrabold mb-6 text-center ${isHelloKittyTheme ? 'text-hk-red' : 'text-accent-blue'}`;
    
    const inputClasses = `w-full p-4 mb-4 border-2 rounded-md focus:outline-none transition-all duration-200 placeholder-gray-400 text-lg
        ${isHelloKittyTheme ? 'border-hk-pink bg-hk-white text-hk-dark-primary focus:border-hk-red' : 'border-gray-600 bg-gray-800 text-dark-text focus:border-accent-blue'}`;
        
    const buttonClasses = `w-full px-6 py-4 font-bold rounded-md text-lg shadow-lg transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${isHelloKittyTheme ? 'bg-hk-red text-hk-white hover:bg-hk-pink focus:ring-hk-red' : 'bg-accent-blue text-dark-bg hover:bg-accent-purple focus:ring-accent-blue'}`;

    const messageClasses = `p-4 rounded-md text-center font-semibold ${message ? 'bg-green-100 text-green-800 border border-green-300' : ''}`;
    
    const errorClasses = `p-4 rounded-md text-center font-semibold ${error ? 'bg-red-100 text-red-800 border border-red-300' : ''}`;

    return (
        <div className={containerClasses}>
            <div className={formCardClasses}>
                <h2 className={headingClasses}>
                    Reset Your Password
                </h2>

                {message && (
                    <div className={messageClasses}>
                        {message}
                    </div>
                )}

                {error && (
                    <div className={errorClasses}>
                        {error}
                    </div>
                )}

                {!message && (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputClasses}
                            required
                            minLength={6}
                        />

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={inputClasses}
                            required
                            minLength={6}
                        />

                        <button 
                            type="submit" 
                            className={buttonClasses}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className={`text-sm font-medium transition-colors duration-200 hover:underline ${isHelloKittyTheme ? 'text-hk-dark-primary hover:text-hk-red' : 'text-accent-blue hover:text-accent-purple'}`}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
