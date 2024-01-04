import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const saveUserInfoToLocalStorage = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setLoggedIn(true);
  };

  const removeUserInfoFromLocalStorage = () => {
    localStorage.removeItem('userInfo');
    setLoggedIn(false);
  };

  const isLoggedIn = () => {
    const userInfo = localStorage.getItem('userInfo');
    return !!userInfo;
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        saveUserInfoToLocalStorage,
        removeUserInfoFromLocalStorage,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};