// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken } from "./Auth";
import { useNavigate } from "react-router-dom";

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

  const signUp = (accountId) => {
    setAuthenticated((prevState) => !prevState);
    setAccountId(accountId);
  };

  const login = (accountId) => {
    setAuthenticated((prevState) => !prevState);
    setAccountId(accountId);
  };

  const logout = () => {
    setAuthenticated(false);
    setAccountId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("accountId");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, login, logout, accountId, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
