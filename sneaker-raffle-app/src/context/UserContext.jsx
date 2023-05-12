import React, {
  createContext, useContext, useState, useEffect, useMemo,
} from 'react';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue = useMemo(() => ({ user, saveUser, removeUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export { UserContextProvider, useUserContext };
