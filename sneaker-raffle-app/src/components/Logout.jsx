import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Logout() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser().then(() => {
      navigate('/');
    });
  }, [logoutUser, navigate]);

  return null;
}

export default Logout;
