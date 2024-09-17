import React, { useState } from 'react';
import SignupForm from '../Component/Auth/SignupForm';
import LoginForm from '../Component/Auth/LoginForm';

function LandingPage() {
  const [activeTab, setActiveTab] = useState('signup'); // Default tab

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`w-1/2 py-3 text-lg font-semibold ${activeTab === 'signup' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'} transition-colors duration-300`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 py-3 text-lg font-semibold ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'} transition-colors duration-300`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </div>

        {activeTab === 'signup' && <SignupForm />}
        {activeTab === 'login' && <LoginForm />}
      </div>
    </div>
  );
}

export default LandingPage;
