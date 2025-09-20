import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Validate token on app start
    if (token && user) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async () => {
    try {
      // You could add a /auth/verify endpoint to validate token
      setLoading(false);
    } catch (error) {
      console.error("Token validation failed:", error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      setError("");
      const response = await api.post("/auth/login", { email, password });
      const { token: authToken, user: userData, role } = response.data;

      const userWithRole = { ...userData, role };

      setToken(authToken);
      setUser(userWithRole);

      return { success: true, role };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      setError("");
      await api.post("/auth/register", userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError("");
  };

  const clearError = () => setError("");

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
