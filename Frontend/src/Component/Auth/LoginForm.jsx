import React, { useState } from 'react';
import InputField from '../InputField';
import useFormStatus from '../../hooks/useFormStatus';
import { useDispatch } from 'react-redux';
import { Login } from '../../Services/operations/authAPI';

function LoginForm() {
  const { status, error, success, startSubmitting, submitSuccess, submitError, reseFormStatus } = useFormStatus();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.username || !formData.password) {
      submitError('Please fill out all fields');
      return;
    }

    dispatch(Login(formData.username, formData.password));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>

        {status === 'error' && <div className="text-red-500 mb-4">{error}</div>}
        {status === 'success' && <div className="text-green-500 mb-4">{success}</div>}

        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
