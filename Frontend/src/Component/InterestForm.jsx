import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInterest, updateInterest } from '../Services/operations/userAPI';

const interests = [
    'Coding',
    'Reading Books',
    'Machine Learning',
    'Travelling',
    'Music',
    'Sports',
    'Photography',
    'Gaming',
    'Cooking',
    'Writing',
    'Movies',
    'Fitness',
  ];

function InterestForm() {
    const token = useSelector((state) => state.user.token);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        
        const intervalId = setInterval(() => {
            if (token) {
                dispatch(getAllInterest(token)); 
            }
          }, 2000);
      
          return () => clearInterval(intervalId);
    }, [])

    const handleSelectInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            // Remove interest if already selected
            setSelectedInterests(selectedInterests.filter((i) => i !== interest));
        } else {
            // Add interest if not selected
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateInterest(selectedInterests, token));
    };

    // console.log("interests form", interests);

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Select Your Interests</h2>

            {/* Display existing interests fetched from the backend */}
            <div className="mb-4">
                <h3 className="font-medium">Available Interests:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                    {interests?.map((interest, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded-md  ${selectedInterests.includes(interest) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleSelectInterest(interest)}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
            </div>

            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSubmit}
            >
                Save Interests
            </button>
        </div>
    );
}

export default InterestForm;
