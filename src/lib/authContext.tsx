
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
type User = {
  email: string;
} | null;

// Define auth context type
type AuthContextType = {
  user: User;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

// Auth provider props type
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Hardcoded credentials
  const validEmail = 'admin@gmail.com';
  const validPassword = 'admin123';
  
  // Get initial auth state from localStorage if available
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Derived isAuthenticated state
  const isAuthenticated = user !== null;
  
  // Update localStorage when auth state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  // Login function
  const login = (email: string, password: string): boolean => {
    if (email === validEmail && password === validPassword) {
      setUser({ email });
      return true;
    }
    return false;
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
  };
  
  // Create context value
  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}
