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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto py-24 lg:py-32">
        <div className="relative">
          <div className="bg-gray-800 rounded-lg shadow-2xl p-8 md:p-16 text-white">
            <h2 className="text-4xl font-bold mb-4 text-white">Join Our Creative Community</h2>
            <p className="text-gray-300 mb-8">Unleash your creativity and start sharing your unique ideas with the world. Register now and become a part of our vibrant community!</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-bold text-gray-400">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold text-gray-400">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-400">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 text-sm border-0 rounded bg-gray-700 text-white mt-2"
                  required
                />
              </div>
              <button type="submit" className="w-full mt-6 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold py-2 rounded">
                Register
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center text-center text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Become a Part of Our Journey</h2>
            <p className="text-xl">Join our community and explore endless possibilities. Express yourself, learn, and grow with us.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
