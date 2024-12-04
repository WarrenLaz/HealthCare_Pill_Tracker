// Auth.js
import React, { createContext, useState } from "react";

// Create the context
const AuthContext = createContext({});

export const Auth = ({ children }) => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
