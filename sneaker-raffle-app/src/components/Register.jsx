import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError('Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-green-400">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
        <div className="w-1/2 p-8 bg-blue-900 text-white">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Revolution!</h2>
          <p className="mb-8 text-lg">Experience the future of crypto trading today. With our world-class platform, you&apos;ll never look at trading the same way again.</p>
          <p className="mb-4 text-lg">Don&apos;t wait, register now and be part of the future.</p>
        </div>
        <div className="w-1/2 p-8">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Register</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <label htmlFor="email" className="text-sm font-bold text-gray-600">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="text-sm font-bold text-gray-600">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-600">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded mt-2"
                required
              />
            </div>
            <button type="submit" className="w-full mt-6 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
