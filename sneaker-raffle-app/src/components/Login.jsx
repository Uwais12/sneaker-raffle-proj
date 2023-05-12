import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(email, password);
      navigate('/');
    } catch (err) {
      if (err.response.status === 403) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred while logging in. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full mt-6 bg-black text-white font-bold py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
