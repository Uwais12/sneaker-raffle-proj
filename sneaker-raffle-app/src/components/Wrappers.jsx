import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export function PublicOnlyWrapper({ children }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? null : children;
}

export function ProtectedWrapper({ children, requiredRole }) {
  const { user, token } = useContext(UserContext);
  console.log(user, token);
  const navigate = useNavigate();
  // eslint-disable-next-line no-debugger
  debugger;
  useEffect(() => {
    if (!user || !user.roles.includes(requiredRole)) {
      navigate('/login');
    }
  }, [user, requiredRole, navigate]);

  return (!user || !user.roles.includes(requiredRole)) ? null : children;
}
