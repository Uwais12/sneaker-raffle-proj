import { useState } from 'react';
import api from '../api';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      // Throw the error so it can be caught in the Login component
      throw err;
    }
  };

  const registerUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/register', { email, password });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return {
    loginUser, registerUser, fetchCurrentUser, logoutUser, loading, error,
  };
};

export default useAuth;
