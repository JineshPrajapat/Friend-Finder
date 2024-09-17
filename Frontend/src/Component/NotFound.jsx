import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-68px)] text-center dark:text-gray-300">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <a href="https://storyset.com/web">Web illustrations by Storyset</a>
            <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="dark:text-blue-500 p-2 rounded-md bg-gray-200  dark:bg-gray-700 duration-500 hover:scale-105 text-lg">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
