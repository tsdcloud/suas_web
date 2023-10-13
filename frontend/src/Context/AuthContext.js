import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(()=>{
    
  }, [])

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;