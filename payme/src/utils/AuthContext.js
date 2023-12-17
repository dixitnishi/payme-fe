// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken } from "./Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialAuthenticatedState = !!getAuthToken();
  const [authenticated, setAuthenticated] = useState(initialAuthenticatedState);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setAuthenticated(true);
    }
  }, []);

  const login = (accountId) => {
    setAuthenticated((prevState) => !prevState);
    setAccountId(accountId)
  };

  const logout = () => {
    setAuthenticated(false);
    setAccountId(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, accountId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
