// client/src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    // We'll define a simple, clean look for the landing page.
    // It will use the dark aesthetic by default, but we'll apply a conditional
    // theme later if needed.

    return (
        <div className="flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 bg-dark-card rounded-xl shadow-2xl border border-gray-700 max-w-sm sm:max-w-md md:max-w-lg mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent-blue mb-4 tracking-tight leading-tight">
                    Welcome to Your To-Do App
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-dark-text-muted mb-6 sm:mb-8 max-w-prose leading-relaxed">
                    Organize your life, one task at a time. Log in or register to get started with your own personalized to-do list.
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-accent-purple text-white font-bold rounded-md text-base sm:text-lg hover:bg-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-center"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-accent-blue text-dark-bg font-bold rounded-md text-base sm:text-lg hover:bg-accent-purple transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
                >
                    Register
                </Link>
            </div>
            
            <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-dark-text-muted">
                <p>✨ Stay organized • Be productive • Achieve your goals</p>
            </div>
        </div>
    );
}

export default LandingPage;