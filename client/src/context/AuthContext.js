/* // src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(token);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
 */