import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { UserContext } from '../context/UserContext';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);

  const mutation = useMutation(
    () => api.post('/api/auth/login', { email, password }),
    {
      onSuccess: (data) => {
        console.log('Login response - ', data);
        setUser(data.data.user);
        setToken(data.data.token);
        navigate('/');
      },
      onError: (err) => {
        // Handle error
        if (err.response && err.response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('An error occurred. Please try again.');
        }
      },

    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    mutation.mutate();
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
