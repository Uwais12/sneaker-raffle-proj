import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  // On mount, read the user and token from local storage
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    const userFromStorage = JSON.parse(localStorage.getItem('user')); // Parse the user data since it is stored as a string
    // eslint-disable-next-line no-debugger
    // debugger;
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }

    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  // Whenever the token or user changes, save it to local storage
  useEffect(() => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Stringify the user data to store in local storage
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const value = useMemo(() => ({
    user, setUser, token, setToken,
  }), [user, setUser, token, setToken]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
