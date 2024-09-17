import React, { useState } from 'react';
import InputField from '../InputField';
import { useDispatch } from 'react-redux';
import { Signup } from '../../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';


function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill out all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    dispatch(Signup(
      formData.username,
      formData.fullName,
      formData.password,
      formData.confirmPassword,
      navigate
    ));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign Up</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
