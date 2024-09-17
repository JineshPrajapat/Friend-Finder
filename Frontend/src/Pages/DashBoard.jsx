import React from 'react';
import Friend from './Friend';
import Recommendation from './Recommendation';
import AllUsers from './AllUsers';

function DashBoard() {
    return (
        <div className="min-h-screen bg-gray-100 p-4">

            {/* Search Results Section */}
            <div className='overflow-hidden overflow-x-auto'>
                <AllUsers />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Friend />
                <Recommendation />
            </div>



        </div>
    );
}

export default DashBoard;