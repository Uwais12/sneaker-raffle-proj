import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import api from '../api';

function Logout() {
  const navigate = useNavigate();

  const {
    setUser, token, setToken,
  } = useContext(UserContext);

  const logoutMutation = useMutation(() => api.post('/api/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), {
    onSuccess: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    if (token) {
      setToken('');
      navigate('/'); // Move navigation here to ensure it only happens once

      logoutMutation.mutate();
    }
  }, [token]); // Remove logoutMutation from dependencies

  return null;
}

export default Logout;
