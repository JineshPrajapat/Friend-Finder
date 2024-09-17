import React, { useState } from 'react';
import Friend from './Friend';
import RequestSent from './RequestSent';
import RequestReceived from './RequestRecieved';
import Recommendation from './Recommendation';
import DashBoard from './DashBoard';
import Header from '../Component/Header';
import Navbar from '../Component/NavBar';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import AllUsers from './AllUsers';

function HomePage() {
  const [activeTab, setActiveTab] = useState('friends'); // Track the active tab

  return (
    <div className="min-h-screen bg-gray-100 md:p-2">
      <Header/>
      {/* Tab Navigation */}
      <div className="mt-2 bg-white rounded-lg shadow-md p-4">
        <Navbar/>
        <Routes>
            <Route path="/" element={<DashBoard/>}/>
            <Route path="/Friends" element={<Friend/>}/>
            <Route path="/requestSent" element={<RequestSent/>}/>
            <Route path="/requestRecieved" element={<RequestReceived/>}/>
            <Route path="/user/:userID" element={<UserProfile/>}/>
            <Route path="/allUser" element={<AllUsers/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
