// client/src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    // We'll define a simple, clean look for the landing page.
    // It will use the dark aesthetic by default, but we'll apply a conditional
    // theme later if needed.

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card rounded-xl shadow-2xl border border-gray-700">
            <h1 className="text-5xl font-extrabold text-accent-blue mb-4 tracking-tight">
                Welcome to Your To-Do App
            </h1>
            <p className="text-lg text-dark-text-muted mb-8 max-w-prose">
                Organize your life, one task at a time. Log in or register to get started with your own personalized to-do list.
            </p>
            <div className="flex space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-accent-purple text-white font-bold rounded-md text-lg hover:bg-purple-700 transition-colors duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-accent-blue text-dark-bg font-bold rounded-md text-lg hover:bg-accent-purple transition-colors duration-200 shadow-lg transform hover:scale-105 active:scale-95"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;